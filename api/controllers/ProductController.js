/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getFiveHighestPrice: function(req, res) {
        Product.query('select * from product order by "curPrice" DESC limit 5;', function(err, result) {
            // res.json(result.rows);
            res.view('homepage', {
                products_HighestPrice: result.rows
            });
        });
    },
    getFiveMostTimeBidding: function(req, res) {
        var sql = 'select pr."id" as "id", ' +
            'pr."name" as "name", ' +
            'pr."curPrice" as "curPrice", ' +
            'pr."immediatePrice" as "immediatePrice", ' +
            'pr."owner" as "owner", ' +
            'pr."highestBidder" as "highestBidder", ' +
            'pr."startingTime" as "startingTime", ' +
            'pr."finishingTime" as "finishingTime", ' +
            'pr."createdAt" as "createdAt", ' +
            'pr."updatedAt" as "updatedAt", ' +
            'count(pr."id") as "countTimeBidding" ' +
            'from product as pr join bidlog as bl on bl."product" = pr."id" ' +
            'group by pr."id" ' +
            'order by "countTimeBidding" DESC ' +
            'limit 5;'
        Product.query(sql, function(err, result) {
            //res.json(result.rows);
            res.view('homepage', {
                products_MostTimeBidding: result.rows
            });
        });
    },
    getFiveNearest: function(req, res) {
        var sql = 'select product."id", "name", "curPrice", "immediatePrice", "owner", "highestBidder", ' +
            '"startingTime", "finishingTime", "createdAt", "updatedAt", ' +
            '(DATE_PART(\'day\', "finishingTime"::timestamp - current_timestamp::timestamp) * 24 + ' +
            'DATE_PART(\'hour\', "finishingTime"::timestamp - current_timestamp::timestamp)) * 60 + ' +
            'DATE_PART(\'minute\', "finishingTime"::timestamp - current_timestamp::timestamp) as "minuteRemaining" ' +
            'from product ' +
            'where (DATE_PART(\'day\', "finishingTime"::timestamp - current_timestamp::timestamp) * 24 + ' +
            'DATE_PART(\'hour\', "finishingTime"::timestamp - current_timestamp::timestamp)) * 60 + ' +
            'DATE_PART(\'minute\', "finishingTime"::timestamp - current_timestamp::timestamp) >= 0 ' +
            'order by "minuteRemaining" ASC ' +
            'limit 5; ';
        Product.query(sql, function(err, result) {
            //res.json(result.rows);
            res.view('homepage', {
                products_Nearest: result.rows
            });
        });
    }
};