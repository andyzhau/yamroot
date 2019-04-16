db.trackings.requests.aggregate(
  [{
    $match: {
      createdAt: {
        $gte: ISODate('2019-04-16T18:00:00.000+00:00')
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
          format: '%G-%m-%d %H-00',
        }
      },
      time: '$createdAt',
      te: 1,
      ip: 1,
      zone: 1,
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
      zone: 1,
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
    $addFields: {
      analysis: {
        chitika: {
          $switch: {
            branches: [{
                case: {
                  $eq: ['$types.chitika_clicked', true],
                },
                then: '4. Clicked',
              },
              {
                case: {
                  $eq: ['$types.chitika_rendered', true],
                },
                then: '4. Rendered',
              },
              {
                case: {
                  $eq: ['$types.chitika_iframe_rendered', true],
                },
                then: '3. Failed After Iframe',
              },
              {
                case: {
                  $eq: ['$types.chitika', true],
                },
                then: '2. Failed After Initial Execute',
              },
            ],
            default: '1. Not Loaded',
          }
        },
      }
    }
  }, {
    $out: 'agg.details'
  }]
)
