import { calcRange } from './chart-data.js'
// xAxis x轴线
module.exports = function Axis () {
	return {
		/**
		 * [init x/y]
		 * @param  {[type]} type [description]
		 * @return {[type]}      [description]
		 */
		init: function (ctx, options) {
			this._draw(ctx, options)
		},
		_draw: function (ctx, options) {
			ctx.beginPath()
			this._drawXAxis(ctx, options)
			this._drawYAxis(ctx, options)
			ctx.stroke()
		},
		_drawXAxis: function (ctx, options) {
			this._drawXline(ctx, options)
		},
		_drawYAxis: function (ctx, options) {
			this._drawYline(ctx, options)
		},
		_drawXline: function (ctx, options) {
			// XAxis 只允许底部一个轴
			let grid = options.grid[0]
			let xAxis = options.xAxis[0]
			let dataLength = xAxis.data.length
			let average = (grid.width - grid.left - grid.right) / dataLength
			// 坐标横线
			ctx.setStrokeStyle('#000')
			ctx.setTextAlign('center')
			ctx.setFontSize('12')
			ctx.moveTo(grid.left, grid.height - grid.bottom)
			ctx.lineTo(grid.width - grid.right, grid.height - grid.bottom)

			// 坐标下引线
			let a = {
				x: grid.width - grid.right,
				y: grid.height - grid.bottom
			}
			for (let i = 0; i <= dataLength; i++) {
				let l = a.x
				ctx.moveTo(a.x, a.y)
				ctx.lineTo(a.x, a.y + 3)
				a.x -= average
				if (i < dataLength) {
					ctx.fillText(xAxis.data[dataLength - i - 1], (l + a.x) /2 , a.y + 16)
				}
			}
		},
		_drawYline: function (ctx, options) {
			let grid = options.grid[0]
			let yAxis = options.yAxis[0]
			let data = yAxis.data ? yAxis.data : options.series[0].data

			console.log(data)
			let dataMax = Math.max.apply(null, data)
			let dataMin = Math.min.apply(null, data)
			let range = calcRange(dataMax, dataMin)
			grid.range = range
			let dataLength = data.length
			let average = (grid.height - grid.top - grid.bottom) / grid.row
			let numAverage = (range.maxRange - range.minRange) / grid.row
			let num = range.maxRange
			console.log(num)
			ctx.setTextAlign('right')
			ctx.setTextBaseline('middle')
			ctx.moveTo(grid.left, grid.top)
			ctx.lineTo(grid.left, grid.height - grid.bottom)
			let a = {
				x: grid.left,
				y: grid.top
			}
			for (let i = 0; i <= grid.row; i++) {
				ctx.fillText(num, a.x - 6, a.y)
				ctx.moveTo(a.x, a.y)
				ctx.lineTo(a.x - 3, a.y)
				num -= numAverage
				a.y += average
				
			}
		}
	}
}