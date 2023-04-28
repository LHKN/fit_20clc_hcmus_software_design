const { Op } = require('sequelize');

module.exports = {
  $and: Op.and,
  $or: Op.or,
  $eq: Op.eq,
  $ne: Op.ne,
  $is: Op.is,
  $not: Op.not,
  $gt: Op.gt,
  $gte: Op.gte,
  $lt: Op.lt,
  $lte: Op.lte,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $in: Op.in,
  $notIn: Op.notIn,
  $substring: Op.substring,
  $iLike: Op.iLike,
  $like: Op.like
}