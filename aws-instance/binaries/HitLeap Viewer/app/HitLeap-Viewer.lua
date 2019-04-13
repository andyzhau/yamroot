-- This script has to be in the app/ directory to function properly
require "ex"
JSON = (loadfile "JSON.lua")()
underscore = (loadfile "underscore.lua")()

operating_system = arg[1]
app_dir = os.currentdir()

if operating_system == "Linux" then
  killall_command = "killall -s 9 -w"
  local_exec = "./"
  ps = "/"  -- Path separator
  lsp = ":" -- List separator
elseif operating_system == "Windows" then
  killall_command = "taskkill /F /im"
  extension = ".exe"
  ps = "\\"
  lsp = ";"
else
  print(
    "Usage: " .. arg[-1] .. " " .. arg[0] ..
    " <operating system> <HitLeap Viewer arguments>")
  os.exit(-1)
end

function mk_path(list)
  return underscore.join(list, ps)
end

function killall(proc_name)
  os.execute(killall_command .. " " .. proc_name .. (extension or ""))
end

function exe(exe_name)
  return (local_exec or "") .. exe_name .. (extension or "")
end

function rmdir(dir)
  for e in os.dir(dir) do
    local e_path = mk_path{dir, e.name}

    if e.type == "directory" then
      if not os.remove(e_path) then
        rmdir(e_path)
      end
    elseif e.type == "file" then
      os.remove(e_path)
    end
  end

  os.remove(dir)
end

function exists(entry, dir)
  dir = dir or "."

  for e in os.dir(dir) do
    if e.name == entry then
      return true
    end
  end

  return false
end

function env_list(list)
  return underscore.join(list, lsp)
end

function iter_to_array(...)
  local array = {}

  for i in ... do
    array[#array + 1] = i
  end

  return array
end

function load_data()
  local data_file = io.open("data", "r")
  if not data_file then
    return false
  end

  local data_raw = data_file:read("*all")
  data_file:close()

  local data_json = JSON:decode(data_raw)
  if not data_json then
    return false
  end

  return data_json
end

-- Make JSON parsing errors noop
function JSON:onDecodeError()
end

-- Check if restarting from an update
if underscore.any(arg, function(a) return a == "--updated" end) then
  killall("simplewrapper")
end

-- Try to load data file
local data_json = load_data()
local releases_dir = mk_path{app_dir, "releases"}
local installed_releases =
  underscore.map(
    underscore.select(
      iter_to_array(os.dir(releases_dir)),
      function(i) return i.type == "directory" end),
    function(i) return i.name end)

-- If the current data file is invalid, create a new one
if not data_json then
  os.remove("data")

  data_json = {
    newestVersion = {str = installed_releases[1]},
    corruptData = true}
  local new_data_file = io.open("data", "w")
  new_data_file:write(JSON:encode(data_json))
  new_data_file:close()
end

local cur_release = data_json.newestVersion.str

-- Remove older releases
underscore.each(
  underscore.select(
    installed_releases,
    function(rel) return rel ~= cur_release end),
  function(rel) rmdir(mk_path{releases_dir, rel}) end)

-- Set environment for simplewrapper and execute it
local cur_release_dir = mk_path{releases_dir, cur_release}
local cur_release_app_dir = mk_path{cur_release_dir, "app"}

os.setenv("QT_PLUGIN_PATH", cur_release_app_dir)
os.setenv("PATH", env_list{app_dir, cur_release_app_dir, os.getenv("PATH")})
os.setenv("LD_LIBRARY_PATH", env_list{app_dir, cur_release_app_dir})

os.chdir(cur_release_dir)
local pid =
  os.spawn{exe("simplewrapper"), args = underscore.slice(arg, 2, #arg)}
local exit_code = pid:wait(pid)

-- Code 100: could not start
if exit_code == 100 then
  return
end

-- Kill any remaining cefsimple processes and delete the cache (if any)
killall("cefsimple")

if exists("cache") then
  rmdir("cache")
end

-- Code 200: crashed
if exit_code == 200 then
  os.chdir("app")
  os.spawn{exe("crashreporter"), args = {mk_path{"..", "backtrace"}}}
end

-- Check if the user pinned the executable into the taskbar
-- If yes, then replace it by the Start Menu shortcut
if operating_system == "Windows" then
  local appdata_dir = os.getenv("APPDATA")
  local taskbar_dir =
    mk_path{
      appdata_dir, "Microsoft", "Internet Explorer", "Quick Launch",
      "User Pinned", "TaskBar"}

  if exists("simplewrapper.lnk", taskbar_dir) then
    local simplewrapper_lnk = mk_path{taskbar_dir, "simplewrapper.lnk"}
    os.remove(simplewrapper_lnk)

    local hitleap_viewer_lnk =
      mk_path{
        appdata_dir, "Microsoft", "Windows", "Start Menu",
        "Programs", "HitLeap", "HitLeap Viewer.lnk"}

    local hitleap_viewer_lnk_file = io.open(hitleap_viewer_lnk, "rb")
    local hitleap_viewer_lnk_cont = hitleap_viewer_lnk_file:read("*all")
    hitleap_viewer_lnk_file:close()
    
    local taskbar_entry_lnk = io.open(simplewrapper_lnk, "wb")
    taskbar_entry_lnk:write(hitleap_viewer_lnk_cont)
    taskbar_entry_lnk:close()
  end
end
