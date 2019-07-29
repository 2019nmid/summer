/*javascript*/

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];
			descriptor.enumerable = descriptor.enumerable || false;
			descriptor.configurable = true;
			if ("value" in descriptor) descriptor.writable = true;
			Object.defineProperty(target, descriptor.key, descriptor);
		}
	}
	return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);
		if (staticProps) defineProperties(Constructor, staticProps);
		return Constructor;
	};
}();

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

window.onload = function () {
	(function (window) {
		var l = 42,
			// 滑块边长
			r = 9,
			// 滑块半径
			w = 252,
			// canvas宽度
			h = 155,
			// canvas高度
			PI = Math.PI;
		var L = l + r * 2 + 3; // 滑块实际边长

		function getRandomNumberByRange(start, end) {
			return Math.round(Math.random() * (end - start) + start);
		}

		function createCanvas(width, height) {
			var canvas = createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			return canvas;
		}

		function createImg(onload) {
			var img = createElement('img');
			img.crossOrigin = "Anonymous";
			img.onload = onload;
			img.onerror = function () {
				img.src = getRandomImg();
			};
			img.src = getRandomImg();
			return img;
		}

		function createElement(tagName, className) {
			var elment = document.createElement(tagName);
			elment.className = className;
			return elment;
		}
		
		if (!("classList" in document.documentElement)) {
			Object.defineProperty(HTMLElement.prototype, 'classList', {
				get: function () {
					var self = this;

					function update(fn) {
						return function (value) {
							var classes = self.className.split(/\s+/g),
								index = classes.indexOf(value);

							fn(classes, index, value);
							self.className = classes.join(" ");
						}
					}

					return {
						add: update(function (classes, index, value) {
							if (!~index) classes.push(value);
						}),

						remove: update(function (classes, index) {
							if (~index) classes.splice(index, 1);
						}),

						toggle: update(function (classes, index, value) {
							if (~index)
								classes.splice(index, 1);
							else
								classes.push(value);
						}),

						contains: function (value) {
							return !!~self.className.split(/\s+/g).indexOf(value);
						},

						item: function (i) {
							return self.className.split(/\s+/g)[i] || null;
						}
					};
				}
			});
		}

		function addClass(tag, className) {
			tag.classList.add(className);
		}

		function removeClass(tag, className) {
			tag.classList.remove(className);
		}

		function getRandomImg() {
			return 'https://picsum.photos/300/150/?image=' + getRandomNumberByRange(0, 1084);
		}

		function _draw(ctx, x, y, operation) {
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
			ctx.lineTo(x + l, y);
			ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
			ctx.lineTo(x + l, y + l);
			ctx.lineTo(x, y + l);
			ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
			ctx.lineTo(x, y);
			ctx.lineWidth = 2;
			ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
			ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
			ctx.stroke();
			ctx[operation]();
			ctx.globalCompositeOperation = 'overlay';
		}

		function sum(x, y) {
			return x + y;
		}

		function square(x) {
			return x * x;
		}

		var jigsaw = function () {
			function jigsaw(_ref) {
				var el = _ref.el,
					onSuccess = _ref.onSuccess,
					onFail = _ref.onFail,
					onRefresh = _ref.onRefresh;

				_classCallCheck(this, jigsaw);

				el.style.position = el.style.position || 'relative';
				this.el = el;
				this.onSuccess = onSuccess;
				this.onFail = onFail;
				this.onRefresh = onRefresh;
			}

			_createClass(jigsaw, [{
				key: 'init',
				value: function init() {
					this.initDOM();
					this.initImg();
					this.bindEvents();
				}
			}, {
				key: 'initDOM',
				value: function initDOM() {
					var canvas = createCanvas(w, h); // 画布
					var block = canvas.cloneNode(true); // 滑块
					var sliderContainer = createElement('div', 'sliderContainer');
					var refreshIcon = createElement('div', 'refreshIcon');
					var sliderMask = createElement('div', 'sliderMask');
					var slider = createElement('div', 'slider');
					var sliderIcon = createElement('span', 'sliderIcon');
					var text = createElement('span', 'sliderText');

					block.className = 'block';
					text.innerHTML = '拖动左边滑块完成上方拼图';

					var el = this.el;
					el.appendChild(canvas);
					el.appendChild(refreshIcon);
					el.appendChild(block);
					slider.appendChild(sliderIcon);
					sliderMask.appendChild(slider);
					sliderContainer.appendChild(sliderMask);
					sliderContainer.appendChild(text);
					el.appendChild(sliderContainer);

					//20181113
					// 不支持assign方法的兼容写法
					if (typeof Object.assign != 'function') {
						// Must be writable: true, enumerable: false, configurable: true
						Object.defineProperty(Object, "assign", {
							value: function assign(target, varArgs) { // .length of function is 2
								'use strict';
								if (target == null) { // TypeError if undefined or null
									throw new TypeError('Cannot convert undefined or null to object');
								}

								var to = Object(target);

								for (var index = 1; index < arguments.length; index++) {
									var nextSource = arguments[index];

									if (nextSource != null) {
										for (var nextKey in nextSource) {
											
											if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
												to[nextKey] = nextSource[nextKey];
											}
										}
									}
								}
								return to;
							},
							writable: true,
							configurable: true
						});
					}

					Object.assign(this, {
						canvas: canvas,
						block: block,
						sliderContainer: sliderContainer,
						refreshIcon: refreshIcon,
						slider: slider,
						sliderMask: sliderMask,
						sliderIcon: sliderIcon,
						text: text,
						canvasCtx: canvas.getContext('2d'),
						blockCtx: block.getContext('2d')
					});
				}
			}, {
				key: 'initImg',
				value: function initImg() {
					var _this = this;

					var img = createImg(function () {
						_this.canvasCtx.drawImage(img, 0, 0, w, h);
						_this.draw();
						
						_this.blockCtx.drawImage(img, 0, 0, w, h);
						var y = _this.y - r * 2 - 1;

						
						if (navigator.userAgent.indexOf("MSIE") > -1) {
							_this.block.style.marginLeft = '-' + (_this.x - 3) + 'px'; 
						} else {
							var ImageData = _this.blockCtx.getImageData(_this.x - 3, y, L, L);
							_this.block.width = L;
							_this.blockCtx.putImageData(ImageData, 0, y);
						}

					});
					this.img = img;
				}
			}, {
				key: 'draw',
				value: function draw() {
					
					this.x = getRandomNumberByRange(L + 10, w - (L + 10));
					this.y = getRandomNumberByRange(10 + r * 2, h - (L + 10));
					_draw(this.canvasCtx, this.x, this.y, 'fill');
					_draw(this.blockCtx, this.x, this.y, 'clip');
				}
			}, {
				key: 'clean',
				value: function clean() {
					this.canvasCtx.clearRect(0, 0, w, h);
					this.blockCtx.clearRect(0, 0, w, h);
					this.block.width = w;
				}
			}, {
				key: 'bindEvents',
				value: function bindEvents() {
					var _this2 = this;

					this.el.onselectstart = function () {
						return false;
					};
					this.refreshIcon.onclick = function () {
						_this2.reset();
						typeof _this2.onRefresh === 'function' && _this2.onRefresh();
					};

					var originX = void 0,
						originY = void 0,
						trail = [],
						isMouseDown = false;

					var handleDragStart = function handleDragStart(e) {
						originX = e.clientX || e.touches[0].clientX;
						originY = e.clientY || e.touches[0].clientY;
						isMouseDown = true;
					};

					var handleDragMove = function handleDragMove(e) {
						if (!isMouseDown) return false;
						var eventX = e.clientX || e.touches[0].clientX;
						var eventY = e.clientY || e.touches[0].clientY;
						var moveX = eventX - originX;
						var moveY = eventY - originY;
						if (moveX < 0 || moveX + 38 >= w) return false;
						_this2.slider.style.left = moveX + 'px';
						var blockLeft = (w - 40 - 20) / (w - 40) * moveX;
						_this2.block.style.left = blockLeft + 'px';

						addClass(_this2.sliderContainer, 'sliderContainer_active');
						_this2.sliderMask.style.width = moveX + 'px';
						trail.push(moveY);
					};

					var handleDragEnd = function handleDragEnd(e) {
						if (!isMouseDown) return false;
						isMouseDown = false;
						var eventX = e.clientX || e.changedTouches[0].clientX;
						if (eventX == originX) return false;
						removeClass(_this2.sliderContainer, 'sliderContainer_active');
						_this2.trail = trail;

						var _verify = _this2.verify(),
							spliced = _verify.spliced,
							verified = _verify.verified;

						if (spliced) {
							if (verified) {
								addClass(_this2.sliderContainer, 'sliderContainer_success');
								typeof _this2.onSuccess === 'function' && _this2.onSuccess();
							} else {
								addClass(_this2.sliderContainer, 'sliderContainer_fail');
								_this2.text.innerHTML = '再试一次';
								_this2.reset();
							}
						} else {
							addClass(_this2.sliderContainer, 'sliderContainer_fail');
							typeof _this2.onFail === 'function' && _this2.onFail();
							setTimeout(function () {
								_this2.reset();
							}, 1000);
						}
					};
					this.slider.addEventListener('mousedown', handleDragStart);
					this.slider.addEventListener('touchstart', handleDragStart);
					document.addEventListener('mousemove', handleDragMove);
					document.addEventListener('touchmove', handleDragMove);
					document.addEventListener('mouseup', handleDragEnd);
					document.addEventListener('touchend', handleDragEnd);
				}
			}, {
				key: 'verify',
				value: function verify() {
					var arr = this.trail;
					var average = arr.reduce(sum) / arr.length;
					var deviations = arr.map(function (x) {
						return x - average;
					});
					var stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length);
					var left = parseInt(this.block.style.left);
					return {
						spliced: Math.abs(left - this.x) < 10,
						verified: stddev !== 0 
					};
				}
			}, {
				key: 'reset',
				value: function reset() {
					this.sliderContainer.className = 'sliderContainer';
					this.slider.style.left = 0;
					this.block.style.left = 0;
					this.sliderMask.style.width = 0;
					this.clean();
					this.img.src = getRandomImg();
				}
			}]);

			return jigsaw;
		}();

		window.jigsaw = {
			init: function init(opts) {
				return new jigsaw(opts).init();
			}
		};
	})(window);

	
	jigsaw.init({
		el: document.getElementById('captcha'),
		onSuccess: function () {        
            alert('验证成功');
		},
		onFail: cleanMsg,
		onRefresh: cleanMsg
	})

	function cleanMsg() {
		document.getElementById('msg').innerHTML = ''
    }
    var close = document.getElementById('cancel');
    var close_c = document.getElementById('container');
    close.onclick = function fff() {
        close_c.className = 'hide';
    }
    var close_1 = document.getElementById('login_btn');
    var close_l = document.getElementById('login');
    close_1.onclick = function fff1() {
        close_l.className = 'hide';
    };
}
