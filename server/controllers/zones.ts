export const zones: Zone[] = [
  {
    zone: 'blog_popcash',
    baseLink:
      'http://blog.coolocha.com/2019/04/blog-post_11.html?pop_cash=true',
  },
  {
    zone: 'battle_luminous',
    baseLink:
      'http://battle.yamroot.com/trackings?properller=luminous-tag',
  },
  {
    zone: 'track_light',
    baseLink:
      'http://track.yamroot.com/trackings?properller=light-tag',
  },
];

export interface Zone {
  zone: string;
  baseLink: string;
}
