db.trackings.requests.aggregate([{
  $match: {
    createdAt: {
      $gte: ISODate('2019-04-13T23:50:00.000+00:00')
    },
    te: {
      $not: {
        $eq: 'test',
      }
    }
  }
}, {
  $project: {
    createdAt: {
      $dateToString: {
        date: '$createdAt',
        format: '%G-%m-%d %H-00-00',
      }
    },
    time: '$createdAt',
    te: 1,
    ip: 1,
  }
}, {
  $lookup: {
    from: 'trackings.details',
    localField: '_id',
    foreignField: 'request',
    as: 'details',
  }
}, {
  $project: {
    te: 1,
    ip: 1,
    createdAt: 1,
    time: 1,
    types: {
      $arrayToObject: {
        $map: {
          input: '$details',
          as: 'detail',
          in: {
            k: '$$detail.type',
            v: true,
          },
        }
      },
    },
    delays: {
      $arrayToObject: {
        $map: {
          input: '$details',
          as: 'detail',
          in: {
            k: {
              $concat: ['$$detail.type', 'Delay'],
            },
            v: {
              $subtract: ['$$detail.createdAt', '$time'],
            },
          },
        }
      },
    },
    detailsCount: {
      $size: '$details',
    },
  }
}, {
  $out: 'agg.details'
}])
