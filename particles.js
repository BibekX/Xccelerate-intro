/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.0
/* ----------------------------------------------- */

var pJS2 = function (tag_id, params) {
  var canvas_el = document.querySelector(
    "#" + tag_id + " > .particles-js-canvas-el"
  );

  /* particles.js variables with default values */
  this.pJS2 = {
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight,
    },
    particles: {
      number: {
        value: 400,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#fff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#ff0000",
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: "",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 1,
        random: false,
        anim: {
          enable: false,
          speed: 2,
          opacity_min: 0,
          sync: false,
        },
      },
      size: {
        value: 20,
        random: false,
        anim: {
          enable: false,
          speed: 20,
          size_min: 0,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 100,
        color: "#fff",
        opacity: 1,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 3000,
          rotateY: 3000,
        },
      },
      array: [],
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 100,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 200,
          size: 80,
          duration: 0.4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
      mouse: {},
    },
    retina_detect: false,
    fn: {
      interact: {},
      modes: {},
      vendors: {},
    },
    tmp: {},
  };

  var pJS2 = this.pJS2;

  /* params settings */
  if (params) {
    Object.deepExtend(pJS2, params);
  }

  pJS2.tmp.obj = {
    size_value: pJS2.particles.size.value,
    size_anim_speed: pJS2.particles.size.anim.speed,
    move_speed: pJS2.particles.move.speed,
    line_linked_distance: pJS2.particles.line_linked.distance,
    line_linked_width: pJS2.particles.line_linked.width,
    mode_grab_distance: pJS2.interactivity.modes.grab.distance,
    mode_bubble_distance: pJS2.interactivity.modes.bubble.distance,
    mode_bubble_size: pJS2.interactivity.modes.bubble.size,
    mode_repulse_distance: pJS2.interactivity.modes.repulse.distance,
  };

  pJS2.fn.retinaInit = function () {
    if (pJS2.retina_detect && window.devicePixelRatio > 1) {
      pJS2.canvas.pxratio = window.devicePixelRatio;
      pJS2.tmp.retina = true;
    } else {
      pJS2.canvas.pxratio = 1;
      pJS2.tmp.retina = false;
    }

    pJS2.canvas.w = pJS2.canvas.el.offsetWidth * pJS2.canvas.pxratio;
    pJS2.canvas.h = pJS2.canvas.el.offsetHeight * pJS2.canvas.pxratio;

    pJS2.particles.size.value = pJS2.tmp.obj.size_value * pJS2.canvas.pxratio;
    pJS2.particles.size.anim.speed =
      pJS2.tmp.obj.size_anim_speed * pJS2.canvas.pxratio;
    pJS2.particles.move.speed = pJS2.tmp.obj.move_speed * pJS2.canvas.pxratio;
    pJS2.particles.line_linked.distance =
      pJS2.tmp.obj.line_linked_distance * pJS2.canvas.pxratio;
    pJS2.interactivity.modes.grab.distance =
      pJS2.tmp.obj.mode_grab_distance * pJS2.canvas.pxratio;
    pJS2.interactivity.modes.bubble.distance =
      pJS2.tmp.obj.mode_bubble_distance * pJS2.canvas.pxratio;
    pJS2.particles.line_linked.width =
      pJS2.tmp.obj.line_linked_width * pJS2.canvas.pxratio;
    pJS2.interactivity.modes.bubble.size =
      pJS2.tmp.obj.mode_bubble_size * pJS2.canvas.pxratio;
    pJS2.interactivity.modes.repulse.distance =
      pJS2.tmp.obj.mode_repulse_distance * pJS2.canvas.pxratio;
  };

  /* ---------- pJS2 functions - canvas ------------ */

  pJS2.fn.canvasInit = function () {
    pJS2.canvas.ctx = pJS2.canvas.el.getContext("2d");
  };

  pJS2.fn.canvasSize = function () {
    pJS2.canvas.el.width = pJS2.canvas.w;
    pJS2.canvas.el.height = pJS2.canvas.h;

    if (pJS2 && pJS2.interactivity.events.resize) {
      window.addEventListener("resize", function () {
        pJS2.canvas.w = pJS2.canvas.el.offsetWidth;
        pJS2.canvas.h = pJS2.canvas.el.offsetHeight;

        /* resize canvas */
        if (pJS2.tmp.retina) {
          pJS2.canvas.w *= pJS2.canvas.pxratio;
          pJS2.canvas.h *= pJS2.canvas.pxratio;
        }

        pJS2.canvas.el.width = pJS2.canvas.w;
        pJS2.canvas.el.height = pJS2.canvas.h;

        /* repaint canvas on anim disabled */
        if (!pJS2.particles.move.enable) {
          pJS2.fn.particlesEmpty();
          pJS2.fn.particlesCreate();
          pJS2.fn.particlesDraw();
          pJS2.fn.vendors.densityAutoParticles();
        }

        /* density particles enabled */
        pJS2.fn.vendors.densityAutoParticles();
      });
    }
  };

  pJS2.fn.canvasPaint = function () {
    pJS2.canvas.ctx.fillRect(0, 0, pJS2.canvas.w, pJS2.canvas.h);
  };

  pJS2.fn.canvasClear = function () {
    pJS2.canvas.ctx.clearRect(0, 0, pJS2.canvas.w, pJS2.canvas.h);
  };

  /* --------- pJS2 functions - particles ----------- */

  pJS2.fn.particle = function (color, opacity, position) {
    /* size */
    this.radius =
      (pJS2.particles.size.random ? Math.random() : 1) *
      pJS2.particles.size.value;
    if (pJS2.particles.size.anim.enable) {
      this.size_status = false;
      this.vs = pJS2.particles.size.anim.speed / 100;
      if (!pJS2.particles.size.anim.sync) {
        this.vs = this.vs * Math.random();
      }
    }

    /* position */
    this.x = position ? position.x : Math.random() * pJS2.canvas.w;
    this.y = position ? position.y : Math.random() * pJS2.canvas.h;

    /* check position  - into the canvas */
    if (this.x > pJS2.canvas.w - this.radius * 2) this.x = this.x - this.radius;
    else if (this.x < this.radius * 2) this.x = this.x + this.radius;
    if (this.y > pJS2.canvas.h - this.radius * 2) this.y = this.y - this.radius;
    else if (this.y < this.radius * 2) this.y = this.y + this.radius;

    /* check position - avoid overlap */
    if (pJS2.particles.move.bounce) {
      pJS2.fn.vendors.checkOverlap(this, position);
    }

    /* color */
    this.color = {};
    if (typeof color.value == "object") {
      if (color.value instanceof Array) {
        var color_selected =
          color.value[
            Math.floor(Math.random() * pJS2.particles.color.value.length)
          ];
        this.color.rgb = hexToRgb(color_selected);
      } else {
        if (
          color.value.r != undefined &&
          color.value.g != undefined &&
          color.value.b != undefined
        ) {
          this.color.rgb = {
            r: color.value.r,
            g: color.value.g,
            b: color.value.b,
          };
        }
        if (
          color.value.h != undefined &&
          color.value.s != undefined &&
          color.value.l != undefined
        ) {
          this.color.hsl = {
            h: color.value.h,
            s: color.value.s,
            l: color.value.l,
          };
        }
      }
    } else if (color.value == "random") {
      this.color.rgb = {
        r: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
        g: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
        b: Math.floor(Math.random() * (255 - 0 + 1)) + 0,
      };
    } else if (typeof color.value == "string") {
      this.color = color;
      this.color.rgb = hexToRgb(this.color.value);
    }

    /* opacity */
    this.opacity =
      (pJS2.particles.opacity.random ? Math.random() : 1) *
      pJS2.particles.opacity.value;
    if (pJS2.particles.opacity.anim.enable) {
      this.opacity_status = false;
      this.vo = pJS2.particles.opacity.anim.speed / 100;
      if (!pJS2.particles.opacity.anim.sync) {
        this.vo = this.vo * Math.random();
      }
    }

    /* animation - velocity for speed */
    var velbase = {};
    switch (pJS2.particles.move.direction) {
      case "top":
        velbase = { x: 0, y: -1 };
        break;
      case "top-right":
        velbase = { x: 0.5, y: -0.5 };
        break;
      case "right":
        velbase = { x: 1, y: -0 };
        break;
      case "bottom-right":
        velbase = { x: 0.5, y: 0.5 };
        break;
      case "bottom":
        velbase = { x: 0, y: 1 };
        break;
      case "bottom-left":
        velbase = { x: -0.5, y: 1 };
        break;
      case "left":
        velbase = { x: -1, y: 0 };
        break;
      case "top-left":
        velbase = { x: -0.5, y: -0.5 };
        break;
      default:
        velbase = { x: 0, y: 0 };
        break;
    }

    if (pJS2.particles.move.straight) {
      this.vx = velbase.x;
      this.vy = velbase.y;
      if (pJS2.particles.move.random) {
        this.vx = this.vx * Math.random();
        this.vy = this.vy * Math.random();
      }
    } else {
      this.vx = velbase.x + Math.random() - 0.5;
      this.vy = velbase.y + Math.random() - 0.5;
    }

    // var theta = 2.0 * Math.PI * Math.random();
    // this.vx = Math.cos(theta);
    // this.vy = Math.sin(theta);

    this.vx_i = this.vx;
    this.vy_i = this.vy;

    /* if shape is image */

    var shape_type = pJS2.particles.shape.type;
    if (typeof shape_type == "object") {
      if (shape_type instanceof Array) {
        var shape_selected =
          shape_type[Math.floor(Math.random() * shape_type.length)];
        this.shape = shape_selected;
      }
    } else {
      this.shape = shape_type;
    }

    if (this.shape == "image") {
      var sh = pJS2.particles.shape;
      this.img = {
        src: sh.image.src,
        ratio: sh.image.width / sh.image.height,
      };
      if (!this.img.ratio) this.img.ratio = 1;
      if (pJS2.tmp.img_type == "svg" && pJS2.tmp.source_svg != undefined) {
        pJS2.fn.vendors.createSvgImg(this);
        if (pJS2.tmp.pushing) {
          this.img.loaded = false;
        }
      }
    }
  };

  pJS2.fn.particle.prototype.draw = function () {
    var p = this;

    if (p.radius_bubble != undefined) {
      var radius = p.radius_bubble;
    } else {
      var radius = p.radius;
    }

    if (p.opacity_bubble != undefined) {
      var opacity = p.opacity_bubble;
    } else {
      var opacity = p.opacity;
    }

    if (p.color.rgb) {
      var color_value =
        "rgba(" +
        p.color.rgb.r +
        "," +
        p.color.rgb.g +
        "," +
        p.color.rgb.b +
        "," +
        opacity +
        ")";
    } else {
      var color_value =
        "hsla(" +
        p.color.hsl.h +
        "," +
        p.color.hsl.s +
        "%," +
        p.color.hsl.l +
        "%," +
        opacity +
        ")";
    }

    pJS2.canvas.ctx.fillStyle = color_value;
    pJS2.canvas.ctx.beginPath();

    switch (p.shape) {
      case "circle":
        pJS2.canvas.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
        break;

      case "edge":
        pJS2.canvas.ctx.rect(
          p.x - radius,
          p.y - radius,
          radius * 2,
          radius * 2
        );
        break;

      case "triangle":
        pJS2.fn.vendors.drawShape(
          pJS2.canvas.ctx,
          p.x - radius,
          p.y + radius / 1.66,
          radius * 2,
          3,
          2
        );
        break;

      case "polygon":
        pJS2.fn.vendors.drawShape(
          pJS2.canvas.ctx,
          p.x - radius / (pJS2.particles.shape.polygon.nb_sides / 3.5), // startX
          p.y - radius / (2.66 / 3.5), // startY
          (radius * 2.66) / (pJS2.particles.shape.polygon.nb_sides / 3), // sideLength
          pJS2.particles.shape.polygon.nb_sides, // sideCountNumerator
          1 // sideCountDenominator
        );
        break;

      case "star":
        pJS2.fn.vendors.drawShape(
          pJS2.canvas.ctx,
          p.x - (radius * 2) / (pJS2.particles.shape.polygon.nb_sides / 4), // startX
          p.y - radius / ((2 * 2.66) / 3.5), // startY
          (radius * 2 * 2.66) / (pJS2.particles.shape.polygon.nb_sides / 3), // sideLength
          pJS2.particles.shape.polygon.nb_sides, // sideCountNumerator
          2 // sideCountDenominator
        );
        break;

      case "image":
        function draw() {
          pJS2.canvas.ctx.drawImage(
            img_obj,
            p.x - radius,
            p.y - radius,
            radius * 2,
            (radius * 2) / p.img.ratio
          );
        }

        if (pJS2.tmp.img_type == "svg") {
          var img_obj = p.img.obj;
        } else {
          var img_obj = pJS2.tmp.img_obj;
        }

        if (img_obj) {
          draw();
        }

        break;
    }

    pJS2.canvas.ctx.closePath();

    if (pJS2.particles.shape.stroke.width > 0) {
      pJS2.canvas.ctx.strokeStyle = pJS2.particles.shape.stroke.color;
      pJS2.canvas.ctx.lineWidth = pJS2.particles.shape.stroke.width;
      pJS2.canvas.ctx.stroke();
    }

    pJS2.canvas.ctx.fill();
  };

  pJS2.fn.particlesCreate = function () {
    for (var i = 0; i < pJS2.particles.number.value; i++) {
      pJS2.particles.array.push(
        new pJS2.fn.particle(pJS2.particles.color, pJS2.particles.opacity.value)
      );
    }
  };

  pJS2.fn.particlesUpdate = function () {
    for (var i = 0; i < pJS2.particles.array.length; i++) {
      /* the particle */
      var p = pJS2.particles.array[i];

      // var d = ( dx = pJS2.interactivity.mouse.click_pos_x - p.x ) * dx + ( dy = pJS2.interactivity.mouse.click_pos_y - p.y ) * dy;
      // var f = -BANG_SIZE / d;
      // if ( d < BANG_SIZE ) {
      //     var t = Math.atan2( dy, dx );
      //     p.vx = f * Math.cos(t);
      //     p.vy = f * Math.sin(t);
      // }

      /* move the particle */
      if (pJS2.particles.move.enable) {
        var ms = pJS2.particles.move.speed / 2;
        p.x += p.vx * ms;
        p.y += p.vy * ms;
      }

      /* change opacity status */
      if (pJS2.particles.opacity.anim.enable) {
        if (p.opacity_status == true) {
          if (p.opacity >= pJS2.particles.opacity.value)
            p.opacity_status = false;
          p.opacity += p.vo;
        } else {
          if (p.opacity <= pJS2.particles.opacity.anim.opacity_min)
            p.opacity_status = true;
          p.opacity -= p.vo;
        }
        if (p.opacity < 0) p.opacity = 0;
      }

      /* change size */
      if (pJS2.particles.size.anim.enable) {
        if (p.size_status == true) {
          if (p.radius >= pJS2.particles.size.value) p.size_status = false;
          p.radius += p.vs;
        } else {
          if (p.radius <= pJS2.particles.size.anim.size_min)
            p.size_status = true;
          p.radius -= p.vs;
        }
        if (p.radius < 0) p.radius = 0;
      }

      /* change particle position if it is out of canvas */
      if (pJS2.particles.move.out_mode == "bounce") {
        var new_pos = {
          x_left: p.radius,
          x_right: pJS2.canvas.w,
          y_top: p.radius,
          y_bottom: pJS2.canvas.h,
        };
      } else {
        var new_pos = {
          x_left: -p.radius,
          x_right: pJS2.canvas.w + p.radius,
          y_top: -p.radius,
          y_bottom: pJS2.canvas.h + p.radius,
        };
      }

      if (p.x - p.radius > pJS2.canvas.w) {
        p.x = new_pos.x_left;
        p.y = Math.random() * pJS2.canvas.h;
      } else if (p.x + p.radius < 0) {
        p.x = new_pos.x_right;
        p.y = Math.random() * pJS2.canvas.h;
      }
      if (p.y - p.radius > pJS2.canvas.h) {
        p.y = new_pos.y_top;
        p.x = Math.random() * pJS2.canvas.w;
      } else if (p.y + p.radius < 0) {
        p.y = new_pos.y_bottom;
        p.x = Math.random() * pJS2.canvas.w;
      }

      /* out of canvas modes */
      switch (pJS2.particles.move.out_mode) {
        case "bounce":
          if (p.x + p.radius > pJS2.canvas.w) p.vx = -p.vx;
          else if (p.x - p.radius < 0) p.vx = -p.vx;
          if (p.y + p.radius > pJS2.canvas.h) p.vy = -p.vy;
          else if (p.y - p.radius < 0) p.vy = -p.vy;
          break;
      }

      /* events */
      if (isInArray("grab", pJS2.interactivity.events.onhover.mode)) {
        pJS2.fn.modes.grabParticle(p);
      }

      if (
        isInArray("bubble", pJS2.interactivity.events.onhover.mode) ||
        isInArray("bubble", pJS2.interactivity.events.onclick.mode)
      ) {
        pJS2.fn.modes.bubbleParticle(p);
      }

      if (
        isInArray("repulse", pJS2.interactivity.events.onhover.mode) ||
        isInArray("repulse", pJS2.interactivity.events.onclick.mode)
      ) {
        pJS2.fn.modes.repulseParticle(p);
      }

      /* interaction auto between particles */
      if (
        pJS2.particles.line_linked.enable ||
        pJS2.particles.move.attract.enable
      ) {
        for (var j = i + 1; j < pJS2.particles.array.length; j++) {
          var p2 = pJS2.particles.array[j];

          /* link particles */
          if (pJS2.particles.line_linked.enable) {
            pJS2.fn.interact.linkParticles(p, p2);
          }

          /* attract particles */
          if (pJS2.particles.move.attract.enable) {
            pJS2.fn.interact.attractParticles(p, p2);
          }

          /* bounce particles */
          if (pJS2.particles.move.bounce) {
            pJS2.fn.interact.bounceParticles(p, p2);
          }
        }
      }
    }
  };

  pJS2.fn.particlesDraw = function () {
    /* clear canvas */
    pJS2.canvas.ctx.clearRect(0, 0, pJS2.canvas.w, pJS2.canvas.h);

    /* update each particles param */
    pJS2.fn.particlesUpdate();

    /* draw each particle */
    for (var i = 0; i < pJS2.particles.array.length; i++) {
      var p = pJS2.particles.array[i];
      p.draw();
    }
  };

  pJS2.fn.particlesEmpty = function () {
    pJS2.particles.array = [];
  };

  pJS2.fn.particlesRefresh = function () {
    /* init all */
    cancelRequestAnimFrame(pJS2.fn.checkAnimFrame);
    cancelRequestAnimFrame(pJS2.fn.drawAnimFrame);
    pJS2.tmp.source_svg = undefined;
    pJS2.tmp.img_obj = undefined;
    pJS2.tmp.count_svg = 0;
    pJS2.fn.particlesEmpty();
    pJS2.fn.canvasClear();

    /* restart */
    pJS2.fn.vendors.start();
  };

  /* ---------- pJS2 functions - particles interaction ------------ */

  pJS2.fn.interact.linkParticles = function (p1, p2) {
    var dx = p1.x - p2.x,
      dy = p1.y - p2.y,
      dist = Math.sqrt(dx * dx + dy * dy);

    /* draw a line between p1 and p2 if the distance between them is under the config distance */
    if (dist <= pJS2.particles.line_linked.distance) {
      var opacity_line =
        pJS2.particles.line_linked.opacity -
        dist /
          (1 / pJS2.particles.line_linked.opacity) /
          pJS2.particles.line_linked.distance;

      if (opacity_line > 0) {
        /* style */
        var color_line = pJS2.particles.line_linked.color_rgb_line;
        pJS2.canvas.ctx.strokeStyle =
          "rgba(" +
          color_line.r +
          "," +
          color_line.g +
          "," +
          color_line.b +
          "," +
          opacity_line +
          ")";
        pJS2.canvas.ctx.lineWidth = pJS2.particles.line_linked.width;
        //pJS2.canvas.ctx.lineCap = 'round'; /* performance issue */

        /* path */
        pJS2.canvas.ctx.beginPath();
        pJS2.canvas.ctx.moveTo(p1.x, p1.y);
        pJS2.canvas.ctx.lineTo(p2.x, p2.y);
        pJS2.canvas.ctx.stroke();
        pJS2.canvas.ctx.closePath();
      }
    }
  };

  pJS2.fn.interact.attractParticles = function (p1, p2) {
    /* condensed particles */
    var dx = p1.x - p2.x,
      dy = p1.y - p2.y,
      dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= pJS2.particles.line_linked.distance) {
      var ax = dx / (pJS2.particles.move.attract.rotateX * 1000),
        ay = dy / (pJS2.particles.move.attract.rotateY * 1000);

      p1.vx -= ax;
      p1.vy -= ay;

      p2.vx += ax;
      p2.vy += ay;
    }
  };

  pJS2.fn.interact.bounceParticles = function (p1, p2) {
    var dx = p1.x - p2.x,
      dy = p1.y - p2.y,
      dist = Math.sqrt(dx * dx + dy * dy),
      dist_p = p1.radius + p2.radius;

    if (dist <= dist_p) {
      p1.vx = -p1.vx;
      p1.vy = -p1.vy;

      p2.vx = -p2.vx;
      p2.vy = -p2.vy;
    }
  };

  /* ---------- pJS2 functions - modes events ------------ */

  pJS2.fn.modes.pushParticles = function (nb, pos) {
    pJS2.tmp.pushing = true;

    for (var i = 0; i < nb; i++) {
      pJS2.particles.array.push(
        new pJS2.fn.particle(
          pJS2.particles.color,
          pJS2.particles.opacity.value,
          {
            x: pos ? pos.pos_x : Math.random() * pJS2.canvas.w,
            y: pos ? pos.pos_y : Math.random() * pJS2.canvas.h,
          }
        )
      );
      if (i == nb - 1) {
        if (!pJS2.particles.move.enable) {
          pJS2.fn.particlesDraw();
        }
        pJS2.tmp.pushing = false;
      }
    }
  };

  pJS2.fn.modes.removeParticles = function (nb) {
    pJS2.particles.array.splice(0, nb);
    if (!pJS2.particles.move.enable) {
      pJS2.fn.particlesDraw();
    }
  };

  pJS2.fn.modes.bubbleParticle = function (p) {
    /* on hover event */
    if (
      pJS2.interactivity.events.onhover.enable &&
      isInArray("bubble", pJS2.interactivity.events.onhover.mode)
    ) {
      var dx_mouse = p.x - pJS2.interactivity.mouse.pos_x,
        dy_mouse = p.y - pJS2.interactivity.mouse.pos_y,
        dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse),
        ratio = 1 - dist_mouse / pJS2.interactivity.modes.bubble.distance;

      function init() {
        p.opacity_bubble = p.opacity;
        p.radius_bubble = p.radius;
      }

      /* mousemove - check ratio */
      if (dist_mouse <= pJS2.interactivity.modes.bubble.distance) {
        if (ratio >= 0 && pJS2.interactivity.status == "mousemove") {
          /* size */
          if (
            pJS2.interactivity.modes.bubble.size != pJS2.particles.size.value
          ) {
            if (
              pJS2.interactivity.modes.bubble.size > pJS2.particles.size.value
            ) {
              var size =
                p.radius + pJS2.interactivity.modes.bubble.size * ratio;
              if (size >= 0) {
                p.radius_bubble = size;
              }
            } else {
              var dif = p.radius - pJS2.interactivity.modes.bubble.size,
                size = p.radius - dif * ratio;
              if (size > 0) {
                p.radius_bubble = size;
              } else {
                p.radius_bubble = 0;
              }
            }
          }

          /* opacity */
          if (
            pJS2.interactivity.modes.bubble.opacity !=
            pJS2.particles.opacity.value
          ) {
            if (
              pJS2.interactivity.modes.bubble.opacity >
              pJS2.particles.opacity.value
            ) {
              var opacity = pJS2.interactivity.modes.bubble.opacity * ratio;
              if (
                opacity > p.opacity &&
                opacity <= pJS2.interactivity.modes.bubble.opacity
              ) {
                p.opacity_bubble = opacity;
              }
            } else {
              var opacity =
                p.opacity -
                (pJS2.particles.opacity.value -
                  pJS2.interactivity.modes.bubble.opacity) *
                  ratio;
              if (
                opacity < p.opacity &&
                opacity >= pJS2.interactivity.modes.bubble.opacity
              ) {
                p.opacity_bubble = opacity;
              }
            }
          }
        }
      } else {
        init();
      }

      /* mouseleave */
      if (pJS2.interactivity.status == "mouseleave") {
        init();
      }
    } else if (
      /* on click event */
      pJS2.interactivity.events.onclick.enable &&
      isInArray("bubble", pJS2.interactivity.events.onclick.mode)
    ) {
      if (pJS2.tmp.bubble_clicking) {
        var dx_mouse = p.x - pJS2.interactivity.mouse.click_pos_x,
          dy_mouse = p.y - pJS2.interactivity.mouse.click_pos_y,
          dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse),
          time_spent =
            (new Date().getTime() - pJS2.interactivity.mouse.click_time) / 1000;

        if (time_spent > pJS2.interactivity.modes.bubble.duration) {
          pJS2.tmp.bubble_duration_end = true;
        }

        if (time_spent > pJS2.interactivity.modes.bubble.duration * 2) {
          pJS2.tmp.bubble_clicking = false;
          pJS2.tmp.bubble_duration_end = false;
        }
      }

      function process(bubble_param, particles_param, p_obj_bubble, p_obj, id) {
        if (bubble_param != particles_param) {
          if (!pJS2.tmp.bubble_duration_end) {
            if (dist_mouse <= pJS2.interactivity.modes.bubble.distance) {
              if (p_obj_bubble != undefined) var obj = p_obj_bubble;
              else var obj = p_obj;
              if (obj != bubble_param) {
                var value =
                  p_obj -
                  (time_spent * (p_obj - bubble_param)) /
                    pJS2.interactivity.modes.bubble.duration;
                if (id == "size") p.radius_bubble = value;
                if (id == "opacity") p.opacity_bubble = value;
              }
            } else {
              if (id == "size") p.radius_bubble = undefined;
              if (id == "opacity") p.opacity_bubble = undefined;
            }
          } else {
            if (p_obj_bubble != undefined) {
              var value_tmp =
                  p_obj -
                  (time_spent * (p_obj - bubble_param)) /
                    pJS2.interactivity.modes.bubble.duration,
                dif = bubble_param - value_tmp;
              value = bubble_param + dif;
              if (id == "size") p.radius_bubble = value;
              if (id == "opacity") p.opacity_bubble = value;
            }
          }
        }
      }

      if (pJS2.tmp.bubble_clicking) {
        /* size */
        process(
          pJS2.interactivity.modes.bubble.size,
          pJS2.particles.size.value,
          p.radius_bubble,
          p.radius,
          "size"
        );
        /* opacity */
        process(
          pJS2.interactivity.modes.bubble.opacity,
          pJS2.particles.opacity.value,
          p.opacity_bubble,
          p.opacity,
          "opacity"
        );
      }
    }
  };

  pJS2.fn.modes.repulseParticle = function (p) {
    if (
      pJS2.interactivity.events.onhover.enable &&
      isInArray("repulse", pJS2.interactivity.events.onhover.mode) &&
      pJS2.interactivity.status == "mousemove"
    ) {
      var dx_mouse = p.x - pJS2.interactivity.mouse.pos_x,
        dy_mouse = p.y - pJS2.interactivity.mouse.pos_y,
        dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);

      var normVec = { x: dx_mouse / dist_mouse, y: dy_mouse / dist_mouse },
        repulseRadius = pJS2.interactivity.modes.repulse.distance,
        velocity = 100,
        repulseFactor = clamp(
          (1 / repulseRadius) *
            (-1 * Math.pow(dist_mouse / repulseRadius, 2) + 1) *
            repulseRadius *
            velocity,
          0,
          50
        );

      var pos = {
        x: p.x + normVec.x * repulseFactor,
        y: p.y + normVec.y * repulseFactor,
      };

      if (pJS2.particles.move.out_mode == "bounce") {
        if (pos.x - p.radius > 0 && pos.x + p.radius < pJS2.canvas.w)
          p.x = pos.x;
        if (pos.y - p.radius > 0 && pos.y + p.radius < pJS2.canvas.h)
          p.y = pos.y;
      } else {
        p.x = pos.x;
        p.y = pos.y;
      }
    } else if (
      pJS2.interactivity.events.onclick.enable &&
      isInArray("repulse", pJS2.interactivity.events.onclick.mode)
    ) {
      if (!pJS2.tmp.repulse_finish) {
        pJS2.tmp.repulse_count++;
        if (pJS2.tmp.repulse_count == pJS2.particles.array.length) {
          pJS2.tmp.repulse_finish = true;
        }
      }

      if (pJS2.tmp.repulse_clicking) {
        var repulseRadius = Math.pow(
          pJS2.interactivity.modes.repulse.distance / 6,
          3
        );

        var dx = pJS2.interactivity.mouse.click_pos_x - p.x,
          dy = pJS2.interactivity.mouse.click_pos_y - p.y,
          d = dx * dx + dy * dy;

        var force = (-repulseRadius / d) * 1;

        function process() {
          var f = Math.atan2(dy, dx);
          p.vx = force * Math.cos(f);
          p.vy = force * Math.sin(f);

          if (pJS2.particles.move.out_mode == "bounce") {
            var pos = {
              x: p.x + p.vx,
              y: p.y + p.vy,
            };
            if (pos.x + p.radius > pJS2.canvas.w) p.vx = -p.vx;
            else if (pos.x - p.radius < 0) p.vx = -p.vx;
            if (pos.y + p.radius > pJS2.canvas.h) p.vy = -p.vy;
            else if (pos.y - p.radius < 0) p.vy = -p.vy;
          }
        }

        // default
        if (d <= repulseRadius) {
          process();
        }

        // bang - slow motion mode
        // if(!pJS2.tmp.repulse_finish){
        //   if(d <= repulseRadius){
        //     process();
        //   }
        // }else{
        //   process();
        // }
      } else {
        if (pJS2.tmp.repulse_clicking == false) {
          p.vx = p.vx_i;
          p.vy = p.vy_i;
        }
      }
    }
  };

  pJS2.fn.modes.grabParticle = function (p) {
    if (
      pJS2.interactivity.events.onhover.enable &&
      pJS2.interactivity.status == "mousemove"
    ) {
      var dx_mouse = p.x - pJS2.interactivity.mouse.pos_x,
        dy_mouse = p.y - pJS2.interactivity.mouse.pos_y,
        dist_mouse = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);

      /* draw a line between the cursor and the particle if the distance between them is under the config distance */
      if (dist_mouse <= pJS2.interactivity.modes.grab.distance) {
        var opacity_line =
          pJS2.interactivity.modes.grab.line_linked.opacity -
          dist_mouse /
            (1 / pJS2.interactivity.modes.grab.line_linked.opacity) /
            pJS2.interactivity.modes.grab.distance;

        if (opacity_line > 0) {
          /* style */
          var color_line = pJS2.particles.line_linked.color_rgb_line;
          pJS2.canvas.ctx.strokeStyle =
            "rgba(" +
            color_line.r +
            "," +
            color_line.g +
            "," +
            color_line.b +
            "," +
            opacity_line +
            ")";
          pJS2.canvas.ctx.lineWidth = pJS2.particles.line_linked.width;
          //pJS2.canvas.ctx.lineCap = 'round'; /* performance issue */

          /* path */
          pJS2.canvas.ctx.beginPath();
          pJS2.canvas.ctx.moveTo(p.x, p.y);
          pJS2.canvas.ctx.lineTo(
            pJS2.interactivity.mouse.pos_x,
            pJS2.interactivity.mouse.pos_y
          );
          pJS2.canvas.ctx.stroke();
          pJS2.canvas.ctx.closePath();
        }
      }
    }
  };

  /* ---------- pJS2 functions - vendors ------------ */

  pJS2.fn.vendors.eventsListeners = function () {
    /* events target element */
    if (pJS2.interactivity.detect_on == "window") {
      pJS2.interactivity.el = window;
    } else {
      pJS2.interactivity.el = pJS2.canvas.el;
    }

    /* detect mouse pos - on hover / click event */
    if (
      pJS2.interactivity.events.onhover.enable ||
      pJS2.interactivity.events.onclick.enable
    ) {
      /* el on mousemove */
      pJS2.interactivity.el.addEventListener("mousemove", function (e) {
        if (pJS2.interactivity.el == window) {
          var pos_x = e.clientX,
            pos_y = e.clientY;
        } else {
          var pos_x = e.offsetX || e.clientX,
            pos_y = e.offsetY || e.clientY;
        }

        pJS2.interactivity.mouse.pos_x = pos_x;
        pJS2.interactivity.mouse.pos_y = pos_y;

        if (pJS2.tmp.retina) {
          pJS2.interactivity.mouse.pos_x *= pJS2.canvas.pxratio;
          pJS2.interactivity.mouse.pos_y *= pJS2.canvas.pxratio;
        }

        pJS2.interactivity.status = "mousemove";
      });

      /* el on onmouseleave */
      pJS2.interactivity.el.addEventListener("mouseleave", function (e) {
        pJS2.interactivity.mouse.pos_x = null;
        pJS2.interactivity.mouse.pos_y = null;
        pJS2.interactivity.status = "mouseleave";
      });
    }

    /* on click event */
    if (pJS2.interactivity.events.onclick.enable) {
      pJS2.interactivity.el.addEventListener("click", function () {
        pJS2.interactivity.mouse.click_pos_x = pJS2.interactivity.mouse.pos_x;
        pJS2.interactivity.mouse.click_pos_y = pJS2.interactivity.mouse.pos_y;
        pJS2.interactivity.mouse.click_time = new Date().getTime();

        if (pJS2.interactivity.events.onclick.enable) {
          switch (pJS2.interactivity.events.onclick.mode) {
            case "push":
              if (pJS2.particles.move.enable) {
                pJS2.fn.modes.pushParticles(
                  pJS2.interactivity.modes.push.particles_nb,
                  pJS2.interactivity.mouse
                );
              } else {
                if (pJS2.interactivity.modes.push.particles_nb == 1) {
                  pJS2.fn.modes.pushParticles(
                    pJS2.interactivity.modes.push.particles_nb,
                    pJS2.interactivity.mouse
                  );
                } else if (pJS2.interactivity.modes.push.particles_nb > 1) {
                  pJS2.fn.modes.pushParticles(
                    pJS2.interactivity.modes.push.particles_nb
                  );
                }
              }
              break;

            case "remove":
              pJS2.fn.modes.removeParticles(
                pJS2.interactivity.modes.remove.particles_nb
              );
              break;

            case "bubble":
              pJS2.tmp.bubble_clicking = true;
              break;

            case "repulse":
              pJS2.tmp.repulse_clicking = true;
              pJS2.tmp.repulse_count = 0;
              pJS2.tmp.repulse_finish = false;
              setTimeout(function () {
                pJS2.tmp.repulse_clicking = false;
              }, pJS2.interactivity.modes.repulse.duration * 1000);
              break;
          }
        }
      });
    }
  };

  pJS2.fn.vendors.densityAutoParticles = function () {
    if (pJS2.particles.number.density.enable) {
      /* calc area */
      var area = (pJS2.canvas.el.width * pJS2.canvas.el.height) / 1000;
      if (pJS2.tmp.retina) {
        area = area / (pJS2.canvas.pxratio * 2);
      }

      /* calc number of particles based on density area */
      var nb_particles =
        (area * pJS2.particles.number.value) /
        pJS2.particles.number.density.value_area;

      /* add or remove X particles */
      var missing_particles = pJS2.particles.array.length - nb_particles;
      if (missing_particles < 0)
        pJS2.fn.modes.pushParticles(Math.abs(missing_particles));
      else pJS2.fn.modes.removeParticles(missing_particles);
    }
  };

  pJS2.fn.vendors.checkOverlap = function (p1, position) {
    for (var i = 0; i < pJS2.particles.array.length; i++) {
      var p2 = pJS2.particles.array[i];

      var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= p1.radius + p2.radius) {
        p1.x = position ? position.x : Math.random() * pJS2.canvas.w;
        p1.y = position ? position.y : Math.random() * pJS2.canvas.h;
        pJS2.fn.vendors.checkOverlap(p1);
      }
    }
  };

  pJS2.fn.vendors.createSvgImg = function (p) {
    /* set color to svg element */
    var svgXml = pJS2.tmp.source_svg,
      rgbHex = /#([0-9A-F]{3,6})/gi,
      coloredSvgXml = svgXml.replace(rgbHex, function (m, r, g, b) {
        if (p.color.rgb) {
          var color_value =
            "rgba(" +
            p.color.rgb.r +
            "," +
            p.color.rgb.g +
            "," +
            p.color.rgb.b +
            "," +
            p.opacity +
            ")";
        } else {
          var color_value =
            "hsla(" +
            p.color.hsl.h +
            "," +
            p.color.hsl.s +
            "%," +
            p.color.hsl.l +
            "%," +
            p.opacity +
            ")";
        }
        return color_value;
      });

    /* prepare to create img with colored svg */
    var svg = new Blob([coloredSvgXml], {
        type: "image/svg+xml;charset=utf-8",
      }),
      DOMURL = window.URL || window.webkitURL || window,
      url = DOMURL.createObjectURL(svg);

    /* create particle img obj */
    var img = new Image();
    img.addEventListener("load", function () {
      p.img.obj = img;
      p.img.loaded = true;
      DOMURL.revokeObjectURL(url);
      pJS2.tmp.count_svg++;
    });
    img.src = url;
  };

  pJS2.fn.vendors.destroypJS2 = function () {
    cancelAnimationFrame(pJS2.fn.drawAnimFrame);
    canvas_el.remove();
    pJS2Dom = null;
  };

  pJS2.fn.vendors.drawShape = function (
    c,
    startX,
    startY,
    sideLength,
    sideCountNumerator,
    sideCountDenominator
  ) {
    // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
    var sideCount = sideCountNumerator * sideCountDenominator;
    var decimalSides = sideCountNumerator / sideCountDenominator;
    var interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
    var interiorAngle = Math.PI - (Math.PI * interiorAngleDegrees) / 180; // convert to radians
    c.save();
    c.beginPath();
    c.translate(startX, startY);
    c.moveTo(0, 0);
    for (var i = 0; i < sideCount; i++) {
      c.lineTo(sideLength, 0);
      c.translate(sideLength, 0);
      c.rotate(interiorAngle);
    }
    //c.stroke();
    c.fill();
    c.restore();
  };

  pJS2.fn.vendors.exportImg = function () {
    window.open(pJS2.canvas.el.toDataURL("image/png"), "_blank");
  };

  pJS2.fn.vendors.loadImg = function (type) {
    pJS2.tmp.img_error = undefined;

    if (pJS2.particles.shape.image.src != "") {
      if (type == "svg") {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", pJS2.particles.shape.image.src);
        xhr.onreadystatechange = function (data) {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              pJS2.tmp.source_svg = data.currentTarget.response;
              pJS2.fn.vendors.checkBeforeDraw();
            } else {
              console.log("Error pJS2 - Image not found");
              pJS2.tmp.img_error = true;
            }
          }
        };
        xhr.send();
      } else {
        var img = new Image();
        img.addEventListener("load", function () {
          pJS2.tmp.img_obj = img;
          pJS2.fn.vendors.checkBeforeDraw();
        });
        img.src = pJS2.particles.shape.image.src;
      }
    } else {
      console.log("Error pJS2 - No image.src");
      pJS2.tmp.img_error = true;
    }
  };

  pJS2.fn.vendors.draw = function () {
    if (pJS2.particles.shape.type == "image") {
      if (pJS2.tmp.img_type == "svg") {
        if (pJS2.tmp.count_svg >= pJS2.particles.number.value) {
          pJS2.fn.particlesDraw();
          if (!pJS2.particles.move.enable)
            cancelRequestAnimFrame(pJS2.fn.drawAnimFrame);
          else pJS2.fn.drawAnimFrame = requestAnimFrame(pJS2.fn.vendors.draw);
        } else {
          //console.log('still loading...');
          if (!pJS2.tmp.img_error)
            pJS2.fn.drawAnimFrame = requestAnimFrame(pJS2.fn.vendors.draw);
        }
      } else {
        if (pJS2.tmp.img_obj != undefined) {
          pJS2.fn.particlesDraw();
          if (!pJS2.particles.move.enable)
            cancelRequestAnimFrame(pJS2.fn.drawAnimFrame);
          else pJS2.fn.drawAnimFrame = requestAnimFrame(pJS2.fn.vendors.draw);
        } else {
          if (!pJS2.tmp.img_error)
            pJS2.fn.drawAnimFrame = requestAnimFrame(pJS2.fn.vendors.draw);
        }
      }
    } else {
      pJS2.fn.particlesDraw();
      if (!pJS2.particles.move.enable)
        cancelRequestAnimFrame(pJS2.fn.drawAnimFrame);
      else pJS2.fn.drawAnimFrame = requestAnimFrame(pJS2.fn.vendors.draw);
    }
  };

  pJS2.fn.vendors.checkBeforeDraw = function () {
    // if shape is image
    if (pJS2.particles.shape.type == "image") {
      if (pJS2.tmp.img_type == "svg" && pJS2.tmp.source_svg == undefined) {
        pJS2.tmp.checkAnimFrame = requestAnimFrame(check);
      } else {
        //console.log('images loaded! cancel check');
        cancelRequestAnimFrame(pJS2.tmp.checkAnimFrame);
        if (!pJS2.tmp.img_error) {
          pJS2.fn.vendors.init();
          pJS2.fn.vendors.draw();
        }
      }
    } else {
      pJS2.fn.vendors.init();
      pJS2.fn.vendors.draw();
    }
  };

  pJS2.fn.vendors.init = function () {
    /* init canvas + particles */
    pJS2.fn.retinaInit();
    pJS2.fn.canvasInit();
    pJS2.fn.canvasSize();
    pJS2.fn.canvasPaint();
    pJS2.fn.particlesCreate();
    pJS2.fn.vendors.densityAutoParticles();

    /* particles.line_linked - convert hex colors to rgb */
    pJS2.particles.line_linked.color_rgb_line = hexToRgb(
      pJS2.particles.line_linked.color
    );
  };

  pJS2.fn.vendors.start = function () {
    if (isInArray("image", pJS2.particles.shape.type)) {
      pJS2.tmp.img_type = pJS2.particles.shape.image.src.substr(
        pJS2.particles.shape.image.src.length - 3
      );
      pJS2.fn.vendors.loadImg(pJS2.tmp.img_type);
    } else {
      pJS2.fn.vendors.checkBeforeDraw();
    }
  };

  /* ---------- pJS2 - start ------------ */

  pJS2.fn.vendors.eventsListeners();

  pJS2.fn.vendors.start();
};

/* ---------- global functions - vendors ------------ */

Object.deepExtend = function (destination, source) {
  for (var property in source) {
    if (
      source[property] &&
      source[property].constructor &&
      source[property].constructor === Object
    ) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};

window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

window.cancelRequestAnimFrame = (function () {
  return (
    window.cancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    clearTimeout
  );
})();

function hexToRgb(hex) {
  // By Tim Down - http://stackoverflow.com/a/5624139/3493650
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

/* ---------- particles.js functions - start ------------ */

window.pJS2Dom = [];

window.particlesJS = function (tag_id, params) {
  //console.log(params);

  /* no string id? so it's object params, and set the id with default id */
  if (typeof tag_id != "string") {
    params = tag_id;
    tag_id = "particles-js";
  }

  /* no id? set the id to default id */
  if (!tag_id) {
    tag_id = "particles-js";
  }

  /* pJS2 elements */
  var pJS2_tag = document.getElementById(tag_id),
    pJS2_canvas_class = "particles-js-canvas-el",
    exist_canvas = pJS2_tag.getElementsByClassName(pJS2_canvas_class);

  /* remove canvas if exists into the pJS2 target tag */
  if (exist_canvas.length) {
    while (exist_canvas.length > 0) {
      pJS2_tag.removeChild(exist_canvas[0]);
    }
  }

  /* create canvas element */
  var canvas_el = document.createElement("canvas");
  canvas_el.className = pJS2_canvas_class;

  /* set size canvas */
  canvas_el.style.width = "100%";
  canvas_el.style.height = "100%";

  /* append canvas */
  var canvas = document.getElementById(tag_id).appendChild(canvas_el);

  /* launch particle.js */
  if (canvas != null) {
    pJS2Dom.push(new pJS2(tag_id, params));
  }
};

window.particlesJS.load = function (tag_id, path_config_json, callback) {
  /* load json config */
  var xhr = new XMLHttpRequest();
  xhr.open("GET", path_config_json);
  xhr.onreadystatechange = function (data) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var params = JSON.parse(data.currentTarget.response);
        window.particlesJS(tag_id, params);
        if (callback) callback();
      } else {
        console.log("Error pJS2 - XMLHttpRequest status: " + xhr.status);
        console.log("Error pJS2 - File config not found");
      }
    }
  };
  xhr.send();
};
