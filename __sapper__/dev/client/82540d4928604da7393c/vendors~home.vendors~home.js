(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~home"],{

/***/ "./node_modules/ol/AssertionError.js":
/*!*******************************************!*\
  !*** ./node_modules/ol/AssertionError.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./node_modules/ol/util.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/AssertionError
 */

/**
 * Error object thrown when an assertion failed. This is an ECMA-262 Error,
 * extended with a `code` property.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error.
 */
var AssertionError = /** @class */ (function (_super) {
    __extends(AssertionError, _super);
    /**
     * @param {number} code Error code.
     */
    function AssertionError(code) {
        var _this = this;
        var path = _util_js__WEBPACK_IMPORTED_MODULE_0__["VERSION"] === 'latest' ? _util_js__WEBPACK_IMPORTED_MODULE_0__["VERSION"] : 'v' + _util_js__WEBPACK_IMPORTED_MODULE_0__["VERSION"].split('-')[0];
        var message = 'Assertion failed. See https://openlayers.org/en/' +
            path +
            '/doc/errors/#' +
            code +
            ' for details.';
        _this = _super.call(this, message) || this;
        /**
         * Error code. The meaning of the code can be found on
         * https://openlayers.org/en/latest/doc/errors/ (replace `latest` with
         * the version found in the OpenLayers script's header comment if a version
         * other than the latest is used).
         * @type {number}
         * @api
         */
        _this.code = code;
        /**
         * @type {string}
         */
        _this.name = 'AssertionError';
        // Re-assign message, see https://github.com/Rich-Harris/buble/issues/40
        _this.message = message;
        return _this;
    }
    return AssertionError;
}(Error));
/* harmony default export */ __webpack_exports__["default"] = (AssertionError);
//# sourceMappingURL=AssertionError.js.map

/***/ }),

/***/ "./node_modules/ol/Disposable.js":
/*!***************************************!*\
  !*** ./node_modules/ol/Disposable.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @module ol/Disposable
 */
/**
 * @classdesc
 * Objects that need to clean up after themselves.
 */
var Disposable = /** @class */ (function () {
    function Disposable() {
        /**
         * The object has already been disposed.
         * @type {boolean}
         * @protected
         */
        this.disposed = false;
    }
    /**
     * Clean up.
     */
    Disposable.prototype.dispose = function () {
        if (!this.disposed) {
            this.disposed = true;
            this.disposeInternal();
        }
    };
    /**
     * Extension point for disposable objects.
     * @protected
     */
    Disposable.prototype.disposeInternal = function () { };
    return Disposable;
}());
/* harmony default export */ __webpack_exports__["default"] = (Disposable);
//# sourceMappingURL=Disposable.js.map

/***/ }),

/***/ "./node_modules/ol/Feature.js":
/*!************************************!*\
  !*** ./node_modules/ol/Feature.js ***!
  \************************************/
/*! exports provided: createStyleFunction, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStyleFunction", function() { return createStyleFunction; });
/* harmony import */ var _Object_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Object.js */ "./node_modules/ol/Object.js");
/* harmony import */ var _events_EventType_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events/EventType.js */ "./node_modules/ol/events/EventType.js");
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./asserts.js */ "./node_modules/ol/asserts.js");
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./events.js */ "./node_modules/ol/events.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/Feature
 */




/**
 * @typedef {typeof Feature|typeof import("./render/Feature.js").default} FeatureClass
 */
/**
 * @typedef {Feature|import("./render/Feature.js").default} FeatureLike
 */
/**
 * @classdesc
 * A vector object for geographic features with a geometry and other
 * attribute properties, similar to the features in vector file formats like
 * GeoJSON.
 *
 * Features can be styled individually with `setStyle`; otherwise they use the
 * style of their vector layer.
 *
 * Note that attribute properties are set as {@link module:ol/Object} properties on
 * the feature object, so they are observable, and have get/set accessors.
 *
 * Typically, a feature has a single geometry property. You can set the
 * geometry using the `setGeometry` method and get it with `getGeometry`.
 * It is possible to store more than one geometry on a feature using attribute
 * properties. By default, the geometry used for rendering is identified by
 * the property name `geometry`. If you want to use another geometry property
 * for rendering, use the `setGeometryName` method to change the attribute
 * property associated with the geometry for the feature.  For example:
 *
 * ```js
 *
 * import Feature from 'ol/Feature';
 * import Polygon from 'ol/geom/Polygon';
 * import Point from 'ol/geom/Point';
 *
 * var feature = new Feature({
 *   geometry: new Polygon(polyCoords),
 *   labelPoint: new Point(labelCoords),
 *   name: 'My Polygon'
 * });
 *
 * // get the polygon geometry
 * var poly = feature.getGeometry();
 *
 * // Render the feature as a point using the coordinates from labelPoint
 * feature.setGeometryName('labelPoint');
 *
 * // get the point geometry
 * var point = feature.getGeometry();
 * ```
 *
 * @api
 * @template {import("./geom/Geometry.js").default} Geometry
 */
var Feature = /** @class */ (function (_super) {
    __extends(Feature, _super);
    /**
     * @param {Geometry|Object<string, *>=} opt_geometryOrProperties
     *     You may pass a Geometry object directly, or an object literal containing
     *     properties. If you pass an object literal, you may include a Geometry
     *     associated with a `geometry` key.
     */
    function Feature(opt_geometryOrProperties) {
        var _this = _super.call(this) || this;
        /**
         * @private
         * @type {number|string|undefined}
         */
        _this.id_ = undefined;
        /**
         * @type {string}
         * @private
         */
        _this.geometryName_ = 'geometry';
        /**
         * User provided style.
         * @private
         * @type {import("./style/Style.js").StyleLike}
         */
        _this.style_ = null;
        /**
         * @private
         * @type {import("./style/Style.js").StyleFunction|undefined}
         */
        _this.styleFunction_ = undefined;
        /**
         * @private
         * @type {?import("./events.js").EventsKey}
         */
        _this.geometryChangeKey_ = null;
        _this.addEventListener(Object(_Object_js__WEBPACK_IMPORTED_MODULE_0__["getChangeEventType"])(_this.geometryName_), _this.handleGeometryChanged_);
        if (opt_geometryOrProperties) {
            if (typeof (
            /** @type {?} */ (opt_geometryOrProperties).getSimplifiedGeometry) === 'function') {
                var geometry = /** @type {Geometry} */ (opt_geometryOrProperties);
                _this.setGeometry(geometry);
            }
            else {
                /** @type {Object<string, *>} */
                var properties = opt_geometryOrProperties;
                _this.setProperties(properties);
            }
        }
        return _this;
    }
    /**
     * Clone this feature. If the original feature has a geometry it
     * is also cloned. The feature id is not set in the clone.
     * @return {Feature} The clone.
     * @api
     */
    Feature.prototype.clone = function () {
        var clone = new Feature(this.hasProperties() ? this.getProperties() : null);
        clone.setGeometryName(this.getGeometryName());
        var geometry = this.getGeometry();
        if (geometry) {
            clone.setGeometry(geometry.clone());
        }
        var style = this.getStyle();
        if (style) {
            clone.setStyle(style);
        }
        return clone;
    };
    /**
     * Get the feature's default geometry.  A feature may have any number of named
     * geometries.  The "default" geometry (the one that is rendered by default) is
     * set when calling {@link module:ol/Feature~Feature#setGeometry}.
     * @return {Geometry|undefined} The default geometry for the feature.
     * @api
     * @observable
     */
    Feature.prototype.getGeometry = function () {
        return /** @type {Geometry|undefined} */ (this.get(this.geometryName_));
    };
    /**
     * Get the feature identifier.  This is a stable identifier for the feature and
     * is either set when reading data from a remote source or set explicitly by
     * calling {@link module:ol/Feature~Feature#setId}.
     * @return {number|string|undefined} Id.
     * @api
     */
    Feature.prototype.getId = function () {
        return this.id_;
    };
    /**
     * Get the name of the feature's default geometry.  By default, the default
     * geometry is named `geometry`.
     * @return {string} Get the property name associated with the default geometry
     *     for this feature.
     * @api
     */
    Feature.prototype.getGeometryName = function () {
        return this.geometryName_;
    };
    /**
     * Get the feature's style. Will return what was provided to the
     * {@link module:ol/Feature~Feature#setStyle} method.
     * @return {import("./style/Style.js").StyleLike|undefined} The feature style.
     * @api
     */
    Feature.prototype.getStyle = function () {
        return this.style_;
    };
    /**
     * Get the feature's style function.
     * @return {import("./style/Style.js").StyleFunction|undefined} Return a function
     * representing the current style of this feature.
     * @api
     */
    Feature.prototype.getStyleFunction = function () {
        return this.styleFunction_;
    };
    /**
     * @private
     */
    Feature.prototype.handleGeometryChange_ = function () {
        this.changed();
    };
    /**
     * @private
     */
    Feature.prototype.handleGeometryChanged_ = function () {
        if (this.geometryChangeKey_) {
            Object(_events_js__WEBPACK_IMPORTED_MODULE_3__["unlistenByKey"])(this.geometryChangeKey_);
            this.geometryChangeKey_ = null;
        }
        var geometry = this.getGeometry();
        if (geometry) {
            this.geometryChangeKey_ = Object(_events_js__WEBPACK_IMPORTED_MODULE_3__["listen"])(geometry, _events_EventType_js__WEBPACK_IMPORTED_MODULE_1__["default"].CHANGE, this.handleGeometryChange_, this);
        }
        this.changed();
    };
    /**
     * Set the default geometry for the feature.  This will update the property
     * with the name returned by {@link module:ol/Feature~Feature#getGeometryName}.
     * @param {Geometry|undefined} geometry The new geometry.
     * @api
     * @observable
     */
    Feature.prototype.setGeometry = function (geometry) {
        this.set(this.geometryName_, geometry);
    };
    /**
     * Set the style for the feature to override the layer style.  This can be a
     * single style object, an array of styles, or a function that takes a
     * resolution and returns an array of styles. To unset the feature style, call
     * `setStyle()` without arguments or a falsey value.
     * @param {import("./style/Style.js").StyleLike=} opt_style Style for this feature.
     * @api
     * @fires module:ol/events/Event~BaseEvent#event:change
     */
    Feature.prototype.setStyle = function (opt_style) {
        this.style_ = opt_style;
        this.styleFunction_ = !opt_style
            ? undefined
            : createStyleFunction(opt_style);
        this.changed();
    };
    /**
     * Set the feature id.  The feature id is considered stable and may be used when
     * requesting features or comparing identifiers returned from a remote source.
     * The feature id can be used with the
     * {@link module:ol/source/Vector~VectorSource#getFeatureById} method.
     * @param {number|string|undefined} id The feature id.
     * @api
     * @fires module:ol/events/Event~BaseEvent#event:change
     */
    Feature.prototype.setId = function (id) {
        this.id_ = id;
        this.changed();
    };
    /**
     * Set the property name to be used when getting the feature's default geometry.
     * When calling {@link module:ol/Feature~Feature#getGeometry}, the value of the property with
     * this name will be returned.
     * @param {string} name The property name of the default geometry.
     * @api
     */
    Feature.prototype.setGeometryName = function (name) {
        this.removeEventListener(Object(_Object_js__WEBPACK_IMPORTED_MODULE_0__["getChangeEventType"])(this.geometryName_), this.handleGeometryChanged_);
        this.geometryName_ = name;
        this.addEventListener(Object(_Object_js__WEBPACK_IMPORTED_MODULE_0__["getChangeEventType"])(this.geometryName_), this.handleGeometryChanged_);
        this.handleGeometryChanged_();
    };
    return Feature;
}(_Object_js__WEBPACK_IMPORTED_MODULE_0__["default"]));
/**
 * Convert the provided object into a feature style function.  Functions passed
 * through unchanged.  Arrays of Style or single style objects wrapped
 * in a new feature style function.
 * @param {!import("./style/Style.js").StyleFunction|!Array<import("./style/Style.js").default>|!import("./style/Style.js").default} obj
 *     A feature style function, a single style, or an array of styles.
 * @return {import("./style/Style.js").StyleFunction} A style function.
 */
function createStyleFunction(obj) {
    if (typeof obj === 'function') {
        return obj;
    }
    else {
        /**
         * @type {Array<import("./style/Style.js").default>}
         */
        var styles_1;
        if (Array.isArray(obj)) {
            styles_1 = obj;
        }
        else {
            Object(_asserts_js__WEBPACK_IMPORTED_MODULE_2__["assert"])(typeof ( /** @type {?} */(obj).getZIndex) === 'function', 41); // Expected an `import("./style/Style.js").Style` or an array of `import("./style/Style.js").Style`
            var style = /** @type {import("./style/Style.js").default} */ (obj);
            styles_1 = [style];
        }
        return function () {
            return styles_1;
        };
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Feature);
//# sourceMappingURL=Feature.js.map

/***/ }),

/***/ "./node_modules/ol/Object.js":
/*!***********************************!*\
  !*** ./node_modules/ol/Object.js ***!
  \***********************************/
/*! exports provided: ObjectEvent, getChangeEventType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectEvent", function() { return ObjectEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getChangeEventType", function() { return getChangeEventType; });
/* harmony import */ var _events_Event_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events/Event.js */ "./node_modules/ol/events/Event.js");
/* harmony import */ var _ObjectEventType_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ObjectEventType.js */ "./node_modules/ol/ObjectEventType.js");
/* harmony import */ var _Observable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Observable.js */ "./node_modules/ol/Observable.js");
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./obj.js */ "./node_modules/ol/obj.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util.js */ "./node_modules/ol/util.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/Object
 */





/**
 * @classdesc
 * Events emitted by {@link module:ol/Object~BaseObject} instances are instances of this type.
 */
var ObjectEvent = /** @class */ (function (_super) {
    __extends(ObjectEvent, _super);
    /**
     * @param {string} type The event type.
     * @param {string} key The property name.
     * @param {*} oldValue The old value for `key`.
     */
    function ObjectEvent(type, key, oldValue) {
        var _this = _super.call(this, type) || this;
        /**
         * The name of the property whose value is changing.
         * @type {string}
         * @api
         */
        _this.key = key;
        /**
         * The old value. To get the new value use `e.target.get(e.key)` where
         * `e` is the event object.
         * @type {*}
         * @api
         */
        _this.oldValue = oldValue;
        return _this;
    }
    return ObjectEvent;
}(_events_Event_js__WEBPACK_IMPORTED_MODULE_0__["default"]));

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Most non-trivial classes inherit from this.
 *
 * This extends {@link module:ol/Observable} with observable
 * properties, where each property is observable as well as the object as a
 * whole.
 *
 * Classes that inherit from this have pre-defined properties, to which you can
 * add your owns. The pre-defined properties are listed in this documentation as
 * 'Observable Properties', and have their own accessors; for example,
 * {@link module:ol/Map~Map} has a `target` property, accessed with
 * `getTarget()` and changed with `setTarget()`. Not all properties are however
 * settable. There are also general-purpose accessors `get()` and `set()`. For
 * example, `get('target')` is equivalent to `getTarget()`.
 *
 * The `set` accessors trigger a change event, and you can monitor this by
 * registering a listener. For example, {@link module:ol/View~View} has a
 * `center` property, so `view.on('change:center', function(evt) {...});` would
 * call the function whenever the value of the center property changes. Within
 * the function, `evt.target` would be the view, so `evt.target.getCenter()`
 * would return the new center.
 *
 * You can add your own observable properties with
 * `object.set('prop', 'value')`, and retrieve that with `object.get('prop')`.
 * You can listen for changes on that property value with
 * `object.on('change:prop', listener)`. You can get a list of all
 * properties with {@link module:ol/Object~BaseObject#getProperties}.
 *
 * Note that the observable properties are separate from standard JS properties.
 * You can, for example, give your map object a title with
 * `map.title='New title'` and with `map.set('title', 'Another title')`. The
 * first will be a `hasOwnProperty`; the second will appear in
 * `getProperties()`. Only the second is observable.
 *
 * Properties can be deleted by using the unset method. E.g.
 * object.unset('foo').
 *
 * @fires ObjectEvent
 * @api
 */
var BaseObject = /** @class */ (function (_super) {
    __extends(BaseObject, _super);
    /**
     * @param {Object<string, *>=} opt_values An object with key-value pairs.
     */
    function BaseObject(opt_values) {
        var _this = _super.call(this) || this;
        // Call {@link module:ol/util~getUid} to ensure that the order of objects' ids is
        // the same as the order in which they were created.  This also helps to
        // ensure that object properties are always added in the same order, which
        // helps many JavaScript engines generate faster code.
        Object(_util_js__WEBPACK_IMPORTED_MODULE_4__["getUid"])(_this);
        /**
         * @private
         * @type {Object<string, *>}
         */
        _this.values_ = null;
        if (opt_values !== undefined) {
            _this.setProperties(opt_values);
        }
        return _this;
    }
    /**
     * Gets a value.
     * @param {string} key Key name.
     * @return {*} Value.
     * @api
     */
    BaseObject.prototype.get = function (key) {
        var value;
        if (this.values_ && this.values_.hasOwnProperty(key)) {
            value = this.values_[key];
        }
        return value;
    };
    /**
     * Get a list of object property names.
     * @return {Array<string>} List of property names.
     * @api
     */
    BaseObject.prototype.getKeys = function () {
        return (this.values_ && Object.keys(this.values_)) || [];
    };
    /**
     * Get an object of all property names and values.
     * @return {Object<string, *>} Object.
     * @api
     */
    BaseObject.prototype.getProperties = function () {
        return (this.values_ && Object(_obj_js__WEBPACK_IMPORTED_MODULE_3__["assign"])({}, this.values_)) || {};
    };
    /**
     * @return {boolean} The object has properties.
     */
    BaseObject.prototype.hasProperties = function () {
        return !!this.values_;
    };
    /**
     * @param {string} key Key name.
     * @param {*} oldValue Old value.
     */
    BaseObject.prototype.notify = function (key, oldValue) {
        var eventType;
        eventType = getChangeEventType(key);
        this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
        eventType = _ObjectEventType_js__WEBPACK_IMPORTED_MODULE_1__["default"].PROPERTYCHANGE;
        this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
    };
    /**
     * Sets a value.
     * @param {string} key Key name.
     * @param {*} value Value.
     * @param {boolean=} opt_silent Update without triggering an event.
     * @api
     */
    BaseObject.prototype.set = function (key, value, opt_silent) {
        var values = this.values_ || (this.values_ = {});
        if (opt_silent) {
            values[key] = value;
        }
        else {
            var oldValue = values[key];
            values[key] = value;
            if (oldValue !== value) {
                this.notify(key, oldValue);
            }
        }
    };
    /**
     * Sets a collection of key-value pairs.  Note that this changes any existing
     * properties and adds new ones (it does not remove any existing properties).
     * @param {Object<string, *>} values Values.
     * @param {boolean=} opt_silent Update without triggering an event.
     * @api
     */
    BaseObject.prototype.setProperties = function (values, opt_silent) {
        for (var key in values) {
            this.set(key, values[key], opt_silent);
        }
    };
    /**
     * Unsets a property.
     * @param {string} key Key name.
     * @param {boolean=} opt_silent Unset without triggering an event.
     * @api
     */
    BaseObject.prototype.unset = function (key, opt_silent) {
        if (this.values_ && key in this.values_) {
            var oldValue = this.values_[key];
            delete this.values_[key];
            if (Object(_obj_js__WEBPACK_IMPORTED_MODULE_3__["isEmpty"])(this.values_)) {
                this.values_ = null;
            }
            if (!opt_silent) {
                this.notify(key, oldValue);
            }
        }
    };
    return BaseObject;
}(_Observable_js__WEBPACK_IMPORTED_MODULE_2__["default"]));
/**
 * @type {Object<string, string>}
 */
var changeEventTypeCache = {};
/**
 * @param {string} key Key name.
 * @return {string} Change name.
 */
function getChangeEventType(key) {
    return changeEventTypeCache.hasOwnProperty(key)
        ? changeEventTypeCache[key]
        : (changeEventTypeCache[key] = 'change:' + key);
}
/* harmony default export */ __webpack_exports__["default"] = (BaseObject);
//# sourceMappingURL=Object.js.map

/***/ }),

/***/ "./node_modules/ol/ObjectEventType.js":
/*!********************************************!*\
  !*** ./node_modules/ol/ObjectEventType.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @module ol/ObjectEventType
 */
/**
 * @enum {string}
 */
/* harmony default export */ __webpack_exports__["default"] = ({
    /**
     * Triggered when a property is changed.
     * @event module:ol/Object.ObjectEvent#propertychange
     * @api
     */
    PROPERTYCHANGE: 'propertychange',
});
//# sourceMappingURL=ObjectEventType.js.map

/***/ }),

/***/ "./node_modules/ol/Observable.js":
/*!***************************************!*\
  !*** ./node_modules/ol/Observable.js ***!
  \***************************************/
/*! exports provided: unByKey, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unByKey", function() { return unByKey; });
/* harmony import */ var _events_Target_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events/Target.js */ "./node_modules/ol/events/Target.js");
/* harmony import */ var _events_EventType_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events/EventType.js */ "./node_modules/ol/events/EventType.js");
/* harmony import */ var _events_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./events.js */ "./node_modules/ol/events.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/Observable
 */



/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * An event target providing convenient methods for listener registration
 * and unregistration. A generic `change` event is always available through
 * {@link module:ol/Observable~Observable#changed}.
 *
 * @fires import("./events/Event.js").default
 * @api
 */
var Observable = /** @class */ (function (_super) {
    __extends(Observable, _super);
    function Observable() {
        var _this = _super.call(this) || this;
        /**
         * @private
         * @type {number}
         */
        _this.revision_ = 0;
        return _this;
    }
    /**
     * Increases the revision counter and dispatches a 'change' event.
     * @api
     */
    Observable.prototype.changed = function () {
        ++this.revision_;
        this.dispatchEvent(_events_EventType_js__WEBPACK_IMPORTED_MODULE_1__["default"].CHANGE);
    };
    /**
     * Get the version number for this object.  Each time the object is modified,
     * its version number will be incremented.
     * @return {number} Revision.
     * @api
     */
    Observable.prototype.getRevision = function () {
        return this.revision_;
    };
    /**
     * Listen for a certain type of event.
     * @param {string|Array<string>} type The event type or array of event types.
     * @param {function(?): ?} listener The listener function.
     * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
     *     called with an array of event types as the first argument, the return
     *     will be an array of keys.
     * @api
     */
    Observable.prototype.on = function (type, listener) {
        if (Array.isArray(type)) {
            var len = type.length;
            var keys = new Array(len);
            for (var i = 0; i < len; ++i) {
                keys[i] = Object(_events_js__WEBPACK_IMPORTED_MODULE_2__["listen"])(this, type[i], listener);
            }
            return keys;
        }
        else {
            return Object(_events_js__WEBPACK_IMPORTED_MODULE_2__["listen"])(this, /** @type {string} */ (type), listener);
        }
    };
    /**
     * Listen once for a certain type of event.
     * @param {string|Array<string>} type The event type or array of event types.
     * @param {function(?): ?} listener The listener function.
     * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
     *     called with an array of event types as the first argument, the return
     *     will be an array of keys.
     * @api
     */
    Observable.prototype.once = function (type, listener) {
        var key;
        if (Array.isArray(type)) {
            var len = type.length;
            key = new Array(len);
            for (var i = 0; i < len; ++i) {
                key[i] = Object(_events_js__WEBPACK_IMPORTED_MODULE_2__["listenOnce"])(this, type[i], listener);
            }
        }
        else {
            key = Object(_events_js__WEBPACK_IMPORTED_MODULE_2__["listenOnce"])(this, /** @type {string} */ (type), listener);
        }
        /** @type {Object} */ (listener).ol_key = key;
        return key;
    };
    /**
     * Unlisten for a certain type of event.
     * @param {string|Array<string>} type The event type or array of event types.
     * @param {function(?): ?} listener The listener function.
     * @api
     */
    Observable.prototype.un = function (type, listener) {
        var key = /** @type {Object} */ (listener).ol_key;
        if (key) {
            unByKey(key);
        }
        else if (Array.isArray(type)) {
            for (var i = 0, ii = type.length; i < ii; ++i) {
                this.removeEventListener(type[i], listener);
            }
        }
        else {
            this.removeEventListener(type, listener);
        }
    };
    return Observable;
}(_events_Target_js__WEBPACK_IMPORTED_MODULE_0__["default"]));
/**
 * Removes an event listener using the key returned by `on()` or `once()`.
 * @param {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} key The key returned by `on()`
 *     or `once()` (or an array of keys).
 * @api
 */
function unByKey(key) {
    if (Array.isArray(key)) {
        for (var i = 0, ii = key.length; i < ii; ++i) {
            Object(_events_js__WEBPACK_IMPORTED_MODULE_2__["unlistenByKey"])(key[i]);
        }
    }
    else {
        Object(_events_js__WEBPACK_IMPORTED_MODULE_2__["unlistenByKey"])(/** @type {import("./events.js").EventsKey} */ (key));
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Observable);
//# sourceMappingURL=Observable.js.map

/***/ }),

/***/ "./node_modules/ol/array.js":
/*!**********************************!*\
  !*** ./node_modules/ol/array.js ***!
  \**********************************/
/*! exports provided: binarySearch, numberSafeCompareFunction, includes, linearFindNearest, reverseSubArray, extend, remove, find, equals, stableSort, findIndex, isSorted */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "binarySearch", function() { return binarySearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numberSafeCompareFunction", function() { return numberSafeCompareFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "includes", function() { return includes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linearFindNearest", function() { return linearFindNearest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reverseSubArray", function() { return reverseSubArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "find", function() { return find; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return equals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stableSort", function() { return stableSort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findIndex", function() { return findIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSorted", function() { return isSorted; });
/**
 * @module ol/array
 */
/**
 * Performs a binary search on the provided sorted list and returns the index of the item if found. If it can't be found it'll return -1.
 * https://github.com/darkskyapp/binary-search
 *
 * @param {Array<*>} haystack Items to search through.
 * @param {*} needle The item to look for.
 * @param {Function=} opt_comparator Comparator function.
 * @return {number} The index of the item if found, -1 if not.
 */
function binarySearch(haystack, needle, opt_comparator) {
    var mid, cmp;
    var comparator = opt_comparator || numberSafeCompareFunction;
    var low = 0;
    var high = haystack.length;
    var found = false;
    while (low < high) {
        /* Note that "(low + high) >>> 1" may overflow, and results in a typecast
         * to double (which gives the wrong results). */
        mid = low + ((high - low) >> 1);
        cmp = +comparator(haystack[mid], needle);
        if (cmp < 0.0) {
            /* Too low. */
            low = mid + 1;
        }
        else {
            /* Key found or too high */
            high = mid;
            found = !cmp;
        }
    }
    /* Key not found. */
    return found ? low : ~low;
}
/**
 * Compare function for array sort that is safe for numbers.
 * @param {*} a The first object to be compared.
 * @param {*} b The second object to be compared.
 * @return {number} A negative number, zero, or a positive number as the first
 *     argument is less than, equal to, or greater than the second.
 */
function numberSafeCompareFunction(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
}
/**
 * Whether the array contains the given object.
 * @param {Array<*>} arr The array to test for the presence of the element.
 * @param {*} obj The object for which to test.
 * @return {boolean} The object is in the array.
 */
function includes(arr, obj) {
    return arr.indexOf(obj) >= 0;
}
/**
 * @param {Array<number>} arr Array.
 * @param {number} target Target.
 * @param {number} direction 0 means return the nearest, > 0
 *    means return the largest nearest, < 0 means return the
 *    smallest nearest.
 * @return {number} Index.
 */
function linearFindNearest(arr, target, direction) {
    var n = arr.length;
    if (arr[0] <= target) {
        return 0;
    }
    else if (target <= arr[n - 1]) {
        return n - 1;
    }
    else {
        var i = void 0;
        if (direction > 0) {
            for (i = 1; i < n; ++i) {
                if (arr[i] < target) {
                    return i - 1;
                }
            }
        }
        else if (direction < 0) {
            for (i = 1; i < n; ++i) {
                if (arr[i] <= target) {
                    return i;
                }
            }
        }
        else {
            for (i = 1; i < n; ++i) {
                if (arr[i] == target) {
                    return i;
                }
                else if (arr[i] < target) {
                    if (arr[i - 1] - target < target - arr[i]) {
                        return i - 1;
                    }
                    else {
                        return i;
                    }
                }
            }
        }
        return n - 1;
    }
}
/**
 * @param {Array<*>} arr Array.
 * @param {number} begin Begin index.
 * @param {number} end End index.
 */
function reverseSubArray(arr, begin, end) {
    while (begin < end) {
        var tmp = arr[begin];
        arr[begin] = arr[end];
        arr[end] = tmp;
        ++begin;
        --end;
    }
}
/**
 * @param {Array<VALUE>} arr The array to modify.
 * @param {!Array<VALUE>|VALUE} data The elements or arrays of elements to add to arr.
 * @template VALUE
 */
function extend(arr, data) {
    var extension = Array.isArray(data) ? data : [data];
    var length = extension.length;
    for (var i = 0; i < length; i++) {
        arr[arr.length] = extension[i];
    }
}
/**
 * @param {Array<VALUE>} arr The array to modify.
 * @param {VALUE} obj The element to remove.
 * @template VALUE
 * @return {boolean} If the element was removed.
 */
function remove(arr, obj) {
    var i = arr.indexOf(obj);
    var found = i > -1;
    if (found) {
        arr.splice(i, 1);
    }
    return found;
}
/**
 * @param {Array<VALUE>} arr The array to search in.
 * @param {function(VALUE, number, ?) : boolean} func The function to compare.
 * @template VALUE
 * @return {VALUE|null} The element found or null.
 */
function find(arr, func) {
    var length = arr.length >>> 0;
    var value;
    for (var i = 0; i < length; i++) {
        value = arr[i];
        if (func(value, i, arr)) {
            return value;
        }
    }
    return null;
}
/**
 * @param {Array|Uint8ClampedArray} arr1 The first array to compare.
 * @param {Array|Uint8ClampedArray} arr2 The second array to compare.
 * @return {boolean} Whether the two arrays are equal.
 */
function equals(arr1, arr2) {
    var len1 = arr1.length;
    if (len1 !== arr2.length) {
        return false;
    }
    for (var i = 0; i < len1; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}
/**
 * Sort the passed array such that the relative order of equal elements is preverved.
 * See https://en.wikipedia.org/wiki/Sorting_algorithm#Stability for details.
 * @param {Array<*>} arr The array to sort (modifies original).
 * @param {!function(*, *): number} compareFnc Comparison function.
 * @api
 */
function stableSort(arr, compareFnc) {
    var length = arr.length;
    var tmp = Array(arr.length);
    var i;
    for (i = 0; i < length; i++) {
        tmp[i] = { index: i, value: arr[i] };
    }
    tmp.sort(function (a, b) {
        return compareFnc(a.value, b.value) || a.index - b.index;
    });
    for (i = 0; i < arr.length; i++) {
        arr[i] = tmp[i].value;
    }
}
/**
 * @param {Array<*>} arr The array to search in.
 * @param {Function} func Comparison function.
 * @return {number} Return index.
 */
function findIndex(arr, func) {
    var index;
    var found = !arr.every(function (el, idx) {
        index = idx;
        return !func(el, idx, arr);
    });
    return found ? index : -1;
}
/**
 * @param {Array<*>} arr The array to test.
 * @param {Function=} opt_func Comparison function.
 * @param {boolean=} opt_strict Strictly sorted (default false).
 * @return {boolean} Return index.
 */
function isSorted(arr, opt_func, opt_strict) {
    var compare = opt_func || numberSafeCompareFunction;
    return arr.every(function (currentVal, index) {
        if (index === 0) {
            return true;
        }
        var res = compare(arr[index - 1], currentVal);
        return !(res > 0 || (opt_strict && res === 0));
    });
}
//# sourceMappingURL=array.js.map

/***/ }),

/***/ "./node_modules/ol/asserts.js":
/*!************************************!*\
  !*** ./node_modules/ol/asserts.js ***!
  \************************************/
/*! exports provided: assert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assert", function() { return assert; });
/* harmony import */ var _AssertionError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AssertionError.js */ "./node_modules/ol/AssertionError.js");
/**
 * @module ol/asserts
 */

/**
 * @param {*} assertion Assertion we expected to be truthy.
 * @param {number} errorCode Error code.
 */
function assert(assertion, errorCode) {
    if (!assertion) {
        throw new _AssertionError_js__WEBPACK_IMPORTED_MODULE_0__["default"](errorCode);
    }
}
//# sourceMappingURL=asserts.js.map

/***/ }),

/***/ "./node_modules/ol/events.js":
/*!***********************************!*\
  !*** ./node_modules/ol/events.js ***!
  \***********************************/
/*! exports provided: listen, listenOnce, unlistenByKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listen", function() { return listen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listenOnce", function() { return listenOnce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unlistenByKey", function() { return unlistenByKey; });
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./obj.js */ "./node_modules/ol/obj.js");
/**
 * @module ol/events
 */

/**
 * Key to use with {@link module:ol/Observable~Observable#unByKey}.
 * @typedef {Object} EventsKey
 * @property {ListenerFunction} listener
 * @property {import("./events/Target.js").EventTargetLike} target
 * @property {string} type
 * @api
 */
/**
 * Listener function. This function is called with an event object as argument.
 * When the function returns `false`, event propagation will stop.
 *
 * @typedef {function((Event|import("./events/Event.js").default)): (void|boolean)} ListenerFunction
 * @api
 */
/**
 * @typedef {Object} ListenerObject
 * @property {ListenerFunction} handleEvent
 */
/**
 * @typedef {ListenerFunction|ListenerObject} Listener
 */
/**
 * Registers an event listener on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * This function efficiently binds a `listener` to a `this` object, and returns
 * a key for use with {@link module:ol/events~unlistenByKey}.
 *
 * @param {import("./events/Target.js").EventTargetLike} target Event target.
 * @param {string} type Event type.
 * @param {ListenerFunction} listener Listener.
 * @param {Object=} opt_this Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 * @param {boolean=} opt_once If true, add the listener as one-off listener.
 * @return {EventsKey} Unique key for the listener.
 */
function listen(target, type, listener, opt_this, opt_once) {
    if (opt_this && opt_this !== target) {
        listener = listener.bind(opt_this);
    }
    if (opt_once) {
        var originalListener_1 = listener;
        listener = function () {
            target.removeEventListener(type, listener);
            originalListener_1.apply(this, arguments);
        };
    }
    var eventsKey = {
        target: target,
        type: type,
        listener: listener,
    };
    target.addEventListener(type, listener);
    return eventsKey;
}
/**
 * Registers a one-off event listener on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * This function efficiently binds a `listener` as self-unregistering listener
 * to a `this` object, and returns a key for use with
 * {@link module:ol/events~unlistenByKey} in case the listener needs to be
 * unregistered before it is called.
 *
 * When {@link module:ol/events~listen} is called with the same arguments after this
 * function, the self-unregistering listener will be turned into a permanent
 * listener.
 *
 * @param {import("./events/Target.js").EventTargetLike} target Event target.
 * @param {string} type Event type.
 * @param {ListenerFunction} listener Listener.
 * @param {Object=} opt_this Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 * @return {EventsKey} Key for unlistenByKey.
 */
function listenOnce(target, type, listener, opt_this) {
    return listen(target, type, listener, opt_this, true);
}
/**
 * Unregisters event listeners on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * The argument passed to this function is the key returned from
 * {@link module:ol/events~listen} or {@link module:ol/events~listenOnce}.
 *
 * @param {EventsKey} key The key.
 */
function unlistenByKey(key) {
    if (key && key.target) {
        key.target.removeEventListener(key.type, key.listener);
        Object(_obj_js__WEBPACK_IMPORTED_MODULE_0__["clear"])(key);
    }
}
//# sourceMappingURL=events.js.map

/***/ }),

/***/ "./node_modules/ol/events/Event.js":
/*!*****************************************!*\
  !*** ./node_modules/ol/events/Event.js ***!
  \*****************************************/
/*! exports provided: stopPropagation, preventDefault, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopPropagation", function() { return stopPropagation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "preventDefault", function() { return preventDefault; });
/**
 * @module ol/events/Event
 */
/**
 * @classdesc
 * Stripped down implementation of the W3C DOM Level 2 Event interface.
 * See https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-interface.
 *
 * This implementation only provides `type` and `target` properties, and
 * `stopPropagation` and `preventDefault` methods. It is meant as base class
 * for higher level events defined in the library, and works with
 * {@link module:ol/events/Target~Target}.
 */
var BaseEvent = /** @class */ (function () {
    /**
     * @param {string} type Type.
     */
    function BaseEvent(type) {
        /**
         * @type {boolean}
         */
        this.propagationStopped;
        /**
         * The event type.
         * @type {string}
         * @api
         */
        this.type = type;
        /**
         * The event target.
         * @type {Object}
         * @api
         */
        this.target = null;
    }
    /**
     * Stop event propagation.
     * @api
     */
    BaseEvent.prototype.preventDefault = function () {
        this.propagationStopped = true;
    };
    /**
     * Stop event propagation.
     * @api
     */
    BaseEvent.prototype.stopPropagation = function () {
        this.propagationStopped = true;
    };
    return BaseEvent;
}());
/**
 * @param {Event|import("./Event.js").default} evt Event
 */
function stopPropagation(evt) {
    evt.stopPropagation();
}
/**
 * @param {Event|import("./Event.js").default} evt Event
 */
function preventDefault(evt) {
    evt.preventDefault();
}
/* harmony default export */ __webpack_exports__["default"] = (BaseEvent);
//# sourceMappingURL=Event.js.map

/***/ }),

/***/ "./node_modules/ol/events/EventType.js":
/*!*********************************************!*\
  !*** ./node_modules/ol/events/EventType.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @module ol/events/EventType
 */
/**
 * @enum {string}
 * @const
 */
/* harmony default export */ __webpack_exports__["default"] = ({
    /**
     * Generic change event. Triggered when the revision counter is increased.
     * @event module:ol/events/Event~BaseEvent#change
     * @api
     */
    CHANGE: 'change',
    /**
     * Generic error event. Triggered when an error occurs.
     * @event module:ol/events/Event~BaseEvent#error
     * @api
     */
    ERROR: 'error',
    BLUR: 'blur',
    CLEAR: 'clear',
    CONTEXTMENU: 'contextmenu',
    CLICK: 'click',
    DBLCLICK: 'dblclick',
    DRAGENTER: 'dragenter',
    DRAGOVER: 'dragover',
    DROP: 'drop',
    FOCUS: 'focus',
    KEYDOWN: 'keydown',
    KEYPRESS: 'keypress',
    LOAD: 'load',
    RESIZE: 'resize',
    TOUCHMOVE: 'touchmove',
    WHEEL: 'wheel',
});
//# sourceMappingURL=EventType.js.map

/***/ }),

/***/ "./node_modules/ol/events/Target.js":
/*!******************************************!*\
  !*** ./node_modules/ol/events/Target.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Disposable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Disposable.js */ "./node_modules/ol/Disposable.js");
/* harmony import */ var _Event_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Event.js */ "./node_modules/ol/events/Event.js");
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../functions.js */ "./node_modules/ol/functions.js");
/* harmony import */ var _obj_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../obj.js */ "./node_modules/ol/obj.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module ol/events/Target
 */




/**
 * @typedef {EventTarget|Target} EventTargetLike
 */
/**
 * @classdesc
 * A simplified implementation of the W3C DOM Level 2 EventTarget interface.
 * See https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget.
 *
 * There are two important simplifications compared to the specification:
 *
 * 1. The handling of `useCapture` in `addEventListener` and
 *    `removeEventListener`. There is no real capture model.
 * 2. The handling of `stopPropagation` and `preventDefault` on `dispatchEvent`.
 *    There is no event target hierarchy. When a listener calls
 *    `stopPropagation` or `preventDefault` on an event object, it means that no
 *    more listeners after this one will be called. Same as when the listener
 *    returns false.
 */
var Target = /** @class */ (function (_super) {
    __extends(Target, _super);
    /**
     * @param {*=} opt_target Default event target for dispatched events.
     */
    function Target(opt_target) {
        var _this = _super.call(this) || this;
        /**
         * @private
         * @type {*}
         */
        _this.eventTarget_ = opt_target;
        /**
         * @private
         * @type {Object<string, number>}
         */
        _this.pendingRemovals_ = null;
        /**
         * @private
         * @type {Object<string, number>}
         */
        _this.dispatching_ = null;
        /**
         * @private
         * @type {Object<string, Array<import("../events.js").Listener>>}
         */
        _this.listeners_ = null;
        return _this;
    }
    /**
     * @param {string} type Type.
     * @param {import("../events.js").Listener} listener Listener.
     */
    Target.prototype.addEventListener = function (type, listener) {
        if (!type || !listener) {
            return;
        }
        var listeners = this.listeners_ || (this.listeners_ = {});
        var listenersForType = listeners[type] || (listeners[type] = []);
        if (listenersForType.indexOf(listener) === -1) {
            listenersForType.push(listener);
        }
    };
    /**
     * Dispatches an event and calls all listeners listening for events
     * of this type. The event parameter can either be a string or an
     * Object with a `type` property.
     *
     * @param {import("./Event.js").default|string} event Event object.
     * @return {boolean|undefined} `false` if anyone called preventDefault on the
     *     event object or if any of the listeners returned false.
     * @api
     */
    Target.prototype.dispatchEvent = function (event) {
        /** @type {import("./Event.js").default|Event} */
        var evt = typeof event === 'string' ? new _Event_js__WEBPACK_IMPORTED_MODULE_1__["default"](event) : event;
        var type = evt.type;
        if (!evt.target) {
            evt.target = this.eventTarget_ || this;
        }
        var listeners = this.listeners_ && this.listeners_[type];
        var propagate;
        if (listeners) {
            var dispatching = this.dispatching_ || (this.dispatching_ = {});
            var pendingRemovals = this.pendingRemovals_ || (this.pendingRemovals_ = {});
            if (!(type in dispatching)) {
                dispatching[type] = 0;
                pendingRemovals[type] = 0;
            }
            ++dispatching[type];
            for (var i = 0, ii = listeners.length; i < ii; ++i) {
                if ('handleEvent' in listeners[i]) {
                    propagate = /** @type {import("../events.js").ListenerObject} */ (listeners[i]).handleEvent(evt);
                }
                else {
                    propagate = /** @type {import("../events.js").ListenerFunction} */ (listeners[i]).call(this, evt);
                }
                if (propagate === false || evt.propagationStopped) {
                    propagate = false;
                    break;
                }
            }
            --dispatching[type];
            if (dispatching[type] === 0) {
                var pr = pendingRemovals[type];
                delete pendingRemovals[type];
                while (pr--) {
                    this.removeEventListener(type, _functions_js__WEBPACK_IMPORTED_MODULE_2__["VOID"]);
                }
                delete dispatching[type];
            }
            return propagate;
        }
    };
    /**
     * Clean up.
     */
    Target.prototype.disposeInternal = function () {
        this.listeners_ && Object(_obj_js__WEBPACK_IMPORTED_MODULE_3__["clear"])(this.listeners_);
    };
    /**
     * Get the listeners for a specified event type. Listeners are returned in the
     * order that they will be called in.
     *
     * @param {string} type Type.
     * @return {Array<import("../events.js").Listener>|undefined} Listeners.
     */
    Target.prototype.getListeners = function (type) {
        return (this.listeners_ && this.listeners_[type]) || undefined;
    };
    /**
     * @param {string=} opt_type Type. If not provided,
     *     `true` will be returned if this event target has any listeners.
     * @return {boolean} Has listeners.
     */
    Target.prototype.hasListener = function (opt_type) {
        if (!this.listeners_) {
            return false;
        }
        return opt_type
            ? opt_type in this.listeners_
            : Object.keys(this.listeners_).length > 0;
    };
    /**
     * @param {string} type Type.
     * @param {import("../events.js").Listener} listener Listener.
     */
    Target.prototype.removeEventListener = function (type, listener) {
        var listeners = this.listeners_ && this.listeners_[type];
        if (listeners) {
            var index = listeners.indexOf(listener);
            if (index !== -1) {
                if (this.pendingRemovals_ && type in this.pendingRemovals_) {
                    // make listener a no-op, and remove later in #dispatchEvent()
                    listeners[index] = _functions_js__WEBPACK_IMPORTED_MODULE_2__["VOID"];
                    ++this.pendingRemovals_[type];
                }
                else {
                    listeners.splice(index, 1);
                    if (listeners.length === 0) {
                        delete this.listeners_[type];
                    }
                }
            }
        }
    };
    return Target;
}(_Disposable_js__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (Target);
//# sourceMappingURL=Target.js.map

/***/ }),

/***/ "./node_modules/ol/functions.js":
/*!**************************************!*\
  !*** ./node_modules/ol/functions.js ***!
  \**************************************/
/*! exports provided: TRUE, FALSE, VOID, memoizeOne */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRUE", function() { return TRUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FALSE", function() { return FALSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VOID", function() { return VOID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "memoizeOne", function() { return memoizeOne; });
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array.js */ "./node_modules/ol/array.js");
/**
 * @module ol/functions
 */

/**
 * Always returns true.
 * @returns {boolean} true.
 */
function TRUE() {
    return true;
}
/**
 * Always returns false.
 * @returns {boolean} false.
 */
function FALSE() {
    return false;
}
/**
 * A reusable function, used e.g. as a default for callbacks.
 *
 * @return {void} Nothing.
 */
function VOID() { }
/**
 * Wrap a function in another function that remembers the last return.  If the
 * returned function is called twice in a row with the same arguments and the same
 * this object, it will return the value from the first call in the second call.
 *
 * @param {function(...any): ReturnType} fn The function to memoize.
 * @return {function(...any): ReturnType} The memoized function.
 * @template ReturnType
 */
function memoizeOne(fn) {
    var called = false;
    /** @type {ReturnType} */
    var lastResult;
    /** @type {Array<any>} */
    var lastArgs;
    var lastThis;
    return function () {
        var nextArgs = Array.prototype.slice.call(arguments);
        if (!called || this !== lastThis || !Object(_array_js__WEBPACK_IMPORTED_MODULE_0__["equals"])(nextArgs, lastArgs)) {
            called = true;
            lastThis = this;
            lastArgs = nextArgs;
            lastResult = fn.apply(this, arguments);
        }
        return lastResult;
    };
}
//# sourceMappingURL=functions.js.map

/***/ }),

/***/ "./node_modules/ol/obj.js":
/*!********************************!*\
  !*** ./node_modules/ol/obj.js ***!
  \********************************/
/*! exports provided: assign, clear, getValues, isEmpty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clear", function() { return clear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getValues", function() { return getValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return isEmpty; });
/**
 * @module ol/obj
 */
/**
 * Polyfill for Object.assign().  Assigns enumerable and own properties from
 * one or more source objects to a target object.
 * See https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign.
 *
 * @param {!Object} target The target object.
 * @param {...Object} var_sources The source object(s).
 * @return {!Object} The modified target object.
 */
var assign = typeof Object.assign === 'function'
    ? Object.assign
    : function (target, var_sources) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        var output = Object(target);
        for (var i = 1, ii = arguments.length; i < ii; ++i) {
            var source = arguments[i];
            if (source !== undefined && source !== null) {
                for (var key in source) {
                    if (source.hasOwnProperty(key)) {
                        output[key] = source[key];
                    }
                }
            }
        }
        return output;
    };
/**
 * Removes all properties from an object.
 * @param {Object} object The object to clear.
 */
function clear(object) {
    for (var property in object) {
        delete object[property];
    }
}
/**
 * Polyfill for Object.values().  Get an array of property values from an object.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
 *
 * @param {!Object<K,V>} object The object from which to get the values.
 * @return {!Array<V>} The property values.
 * @template K,V
 */
var getValues = typeof Object.values === 'function'
    ? Object.values
    : function (object) {
        var values = [];
        for (var property in object) {
            values.push(object[property]);
        }
        return values;
    };
/**
 * Determine if an object has any properties.
 * @param {Object} object The object to check.
 * @return {boolean} The object is empty.
 */
function isEmpty(object) {
    var property;
    for (property in object) {
        return false;
    }
    return !property;
}
//# sourceMappingURL=obj.js.map

/***/ }),

/***/ "./node_modules/ol/util.js":
/*!*********************************!*\
  !*** ./node_modules/ol/util.js ***!
  \*********************************/
/*! exports provided: abstract, getUid, VERSION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "abstract", function() { return abstract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUid", function() { return getUid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERSION", function() { return VERSION; });
/**
 * @module ol/util
 */
/**
 * @return {?} Any return.
 */
function abstract() {
    return /** @type {?} */ ((function () {
        throw new Error('Unimplemented abstract method.');
    })());
}
/**
 * Counter for getUid.
 * @type {number}
 * @private
 */
var uidCounter_ = 0;
/**
 * Gets a unique ID for an object. This mutates the object so that further calls
 * with the same object as a parameter returns the same value. Unique IDs are generated
 * as a strictly increasing sequence. Adapted from goog.getUid.
 *
 * @param {Object} obj The object to get the unique ID for.
 * @return {string} The unique ID for the object.
 * @api
 */
function getUid(obj) {
    return obj.ol_uid || (obj.ol_uid = String(++uidCounter_));
}
/**
 * OpenLayers version.
 * @type {string}
 */
var VERSION = '6.4.3';
//# sourceMappingURL=util.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLy4vbm9kZV9tb2R1bGVzL29sL0Fzc2VydGlvbkVycm9yLmpzIiwid2VicGFjazovLy8vLi9ub2RlX21vZHVsZXMvb2wvRGlzcG9zYWJsZS5qcyIsIndlYnBhY2s6Ly8vLy4vbm9kZV9tb2R1bGVzL29sL0ZlYXR1cmUuanMiLCJ3ZWJwYWNrOi8vLy8uL25vZGVfbW9kdWxlcy9vbC9PYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy8uL25vZGVfbW9kdWxlcy9vbC9PYmplY3RFdmVudFR5cGUuanMiLCJ3ZWJwYWNrOi8vLy8uL25vZGVfbW9kdWxlcy9vbC9PYnNlcnZhYmxlLmpzIiwid2VicGFjazovLy8vLi9ub2RlX21vZHVsZXMvb2wvYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy8uL25vZGVfbW9kdWxlcy9vbC9hc3NlcnRzLmpzIiwid2VicGFjazovLy8vLi9ub2RlX21vZHVsZXMvb2wvZXZlbnRzLmpzIiwid2VicGFjazovLy8vLi9ub2RlX21vZHVsZXMvb2wvZXZlbnRzL0V2ZW50LmpzIiwid2VicGFjazovLy8vLi9ub2RlX21vZHVsZXMvb2wvZXZlbnRzL0V2ZW50VHlwZS5qcyIsIndlYnBhY2s6Ly8vLy4vbm9kZV9tb2R1bGVzL29sL2V2ZW50cy9UYXJnZXQuanMiLCJ3ZWJwYWNrOi8vLy8uL25vZGVfbW9kdWxlcy9vbC9mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy8uL25vZGVfbW9kdWxlcy9vbC9vYmouanMiLCJ3ZWJwYWNrOi8vLy8uL25vZGVfbW9kdWxlcy9vbC91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUEsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCO0FBQ0E7QUFDQSxjQUFjLGdCQUFnQixzQ0FBc0MsaUJBQWlCLEVBQUU7QUFDdkYsNkJBQTZCLHVEQUF1RDtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLENBQUM7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QTtBQUNBLFlBQVksRUFBRTtBQUNkO0FBQ087QUFDUCxzQkFBc0IsRUFBRTtBQUN4QjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDTztBQUNQLGdDIiwiZmlsZSI6IjgyNTQwZDQ5Mjg2MDRkYTczOTNjL3ZlbmRvcnN+aG9tZS52ZW5kb3JzfmhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbi8qKlxuICogQG1vZHVsZSBvbC9Bc3NlcnRpb25FcnJvclxuICovXG5pbXBvcnQgeyBWRVJTSU9OIH0gZnJvbSAnLi91dGlsLmpzJztcbi8qKlxuICogRXJyb3Igb2JqZWN0IHRocm93biB3aGVuIGFuIGFzc2VydGlvbiBmYWlsZWQuIFRoaXMgaXMgYW4gRUNNQS0yNjIgRXJyb3IsXG4gKiBleHRlbmRlZCB3aXRoIGEgYGNvZGVgIHByb3BlcnR5LlxuICogU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0Vycm9yLlxuICovXG52YXIgQXNzZXJ0aW9uRXJyb3IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFzc2VydGlvbkVycm9yLCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb2RlIEVycm9yIGNvZGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gQXNzZXJ0aW9uRXJyb3IoY29kZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcGF0aCA9IFZFUlNJT04gPT09ICdsYXRlc3QnID8gVkVSU0lPTiA6ICd2JyArIFZFUlNJT04uc3BsaXQoJy0nKVswXTtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSAnQXNzZXJ0aW9uIGZhaWxlZC4gU2VlIGh0dHBzOi8vb3BlbmxheWVycy5vcmcvZW4vJyArXG4gICAgICAgICAgICBwYXRoICtcbiAgICAgICAgICAgICcvZG9jL2Vycm9ycy8jJyArXG4gICAgICAgICAgICBjb2RlICtcbiAgICAgICAgICAgICcgZm9yIGRldGFpbHMuJztcbiAgICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBtZXNzYWdlKSB8fCB0aGlzO1xuICAgICAgICAvKipcbiAgICAgICAgICogRXJyb3IgY29kZS4gVGhlIG1lYW5pbmcgb2YgdGhlIGNvZGUgY2FuIGJlIGZvdW5kIG9uXG4gICAgICAgICAqIGh0dHBzOi8vb3BlbmxheWVycy5vcmcvZW4vbGF0ZXN0L2RvYy9lcnJvcnMvIChyZXBsYWNlIGBsYXRlc3RgIHdpdGhcbiAgICAgICAgICogdGhlIHZlcnNpb24gZm91bmQgaW4gdGhlIE9wZW5MYXllcnMgc2NyaXB0J3MgaGVhZGVyIGNvbW1lbnQgaWYgYSB2ZXJzaW9uXG4gICAgICAgICAqIG90aGVyIHRoYW4gdGhlIGxhdGVzdCBpcyB1c2VkKS5cbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICogQGFwaVxuICAgICAgICAgKi9cbiAgICAgICAgX3RoaXMuY29kZSA9IGNvZGU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgX3RoaXMubmFtZSA9ICdBc3NlcnRpb25FcnJvcic7XG4gICAgICAgIC8vIFJlLWFzc2lnbiBtZXNzYWdlLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL1JpY2gtSGFycmlzL2J1YmxlL2lzc3Vlcy80MFxuICAgICAgICBfdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gQXNzZXJ0aW9uRXJyb3I7XG59KEVycm9yKSk7XG5leHBvcnQgZGVmYXVsdCBBc3NlcnRpb25FcnJvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFzc2VydGlvbkVycm9yLmpzLm1hcCIsIi8qKlxuICogQG1vZHVsZSBvbC9EaXNwb3NhYmxlXG4gKi9cbi8qKlxuICogQGNsYXNzZGVzY1xuICogT2JqZWN0cyB0aGF0IG5lZWQgdG8gY2xlYW4gdXAgYWZ0ZXIgdGhlbXNlbHZlcy5cbiAqL1xudmFyIERpc3Bvc2FibGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGlzcG9zYWJsZSgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvYmplY3QgaGFzIGFscmVhZHkgYmVlbiBkaXNwb3NlZC5cbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGlzcG9zZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYW4gdXAuXG4gICAgICovXG4gICAgRGlzcG9zYWJsZS5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc3Bvc2VkKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzcG9zZUludGVybmFsKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEV4dGVuc2lvbiBwb2ludCBmb3IgZGlzcG9zYWJsZSBvYmplY3RzLlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBEaXNwb3NhYmxlLnByb3RvdHlwZS5kaXNwb3NlSW50ZXJuYWwgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgcmV0dXJuIERpc3Bvc2FibGU7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgRGlzcG9zYWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURpc3Bvc2FibGUuanMubWFwIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG4vKipcbiAqIEBtb2R1bGUgb2wvRmVhdHVyZVxuICovXG5pbXBvcnQgQmFzZU9iamVjdCwgeyBnZXRDaGFuZ2VFdmVudFR5cGUgfSBmcm9tICcuL09iamVjdC5qcyc7XG5pbXBvcnQgRXZlbnRUeXBlIGZyb20gJy4vZXZlbnRzL0V2ZW50VHlwZS5qcyc7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuL2Fzc2VydHMuanMnO1xuaW1wb3J0IHsgbGlzdGVuLCB1bmxpc3RlbkJ5S2V5IH0gZnJvbSAnLi9ldmVudHMuanMnO1xuLyoqXG4gKiBAdHlwZWRlZiB7dHlwZW9mIEZlYXR1cmV8dHlwZW9mIGltcG9ydChcIi4vcmVuZGVyL0ZlYXR1cmUuanNcIikuZGVmYXVsdH0gRmVhdHVyZUNsYXNzXG4gKi9cbi8qKlxuICogQHR5cGVkZWYge0ZlYXR1cmV8aW1wb3J0KFwiLi9yZW5kZXIvRmVhdHVyZS5qc1wiKS5kZWZhdWx0fSBGZWF0dXJlTGlrZVxuICovXG4vKipcbiAqIEBjbGFzc2Rlc2NcbiAqIEEgdmVjdG9yIG9iamVjdCBmb3IgZ2VvZ3JhcGhpYyBmZWF0dXJlcyB3aXRoIGEgZ2VvbWV0cnkgYW5kIG90aGVyXG4gKiBhdHRyaWJ1dGUgcHJvcGVydGllcywgc2ltaWxhciB0byB0aGUgZmVhdHVyZXMgaW4gdmVjdG9yIGZpbGUgZm9ybWF0cyBsaWtlXG4gKiBHZW9KU09OLlxuICpcbiAqIEZlYXR1cmVzIGNhbiBiZSBzdHlsZWQgaW5kaXZpZHVhbGx5IHdpdGggYHNldFN0eWxlYDsgb3RoZXJ3aXNlIHRoZXkgdXNlIHRoZVxuICogc3R5bGUgb2YgdGhlaXIgdmVjdG9yIGxheWVyLlxuICpcbiAqIE5vdGUgdGhhdCBhdHRyaWJ1dGUgcHJvcGVydGllcyBhcmUgc2V0IGFzIHtAbGluayBtb2R1bGU6b2wvT2JqZWN0fSBwcm9wZXJ0aWVzIG9uXG4gKiB0aGUgZmVhdHVyZSBvYmplY3QsIHNvIHRoZXkgYXJlIG9ic2VydmFibGUsIGFuZCBoYXZlIGdldC9zZXQgYWNjZXNzb3JzLlxuICpcbiAqIFR5cGljYWxseSwgYSBmZWF0dXJlIGhhcyBhIHNpbmdsZSBnZW9tZXRyeSBwcm9wZXJ0eS4gWW91IGNhbiBzZXQgdGhlXG4gKiBnZW9tZXRyeSB1c2luZyB0aGUgYHNldEdlb21ldHJ5YCBtZXRob2QgYW5kIGdldCBpdCB3aXRoIGBnZXRHZW9tZXRyeWAuXG4gKiBJdCBpcyBwb3NzaWJsZSB0byBzdG9yZSBtb3JlIHRoYW4gb25lIGdlb21ldHJ5IG9uIGEgZmVhdHVyZSB1c2luZyBhdHRyaWJ1dGVcbiAqIHByb3BlcnRpZXMuIEJ5IGRlZmF1bHQsIHRoZSBnZW9tZXRyeSB1c2VkIGZvciByZW5kZXJpbmcgaXMgaWRlbnRpZmllZCBieVxuICogdGhlIHByb3BlcnR5IG5hbWUgYGdlb21ldHJ5YC4gSWYgeW91IHdhbnQgdG8gdXNlIGFub3RoZXIgZ2VvbWV0cnkgcHJvcGVydHlcbiAqIGZvciByZW5kZXJpbmcsIHVzZSB0aGUgYHNldEdlb21ldHJ5TmFtZWAgbWV0aG9kIHRvIGNoYW5nZSB0aGUgYXR0cmlidXRlXG4gKiBwcm9wZXJ0eSBhc3NvY2lhdGVkIHdpdGggdGhlIGdlb21ldHJ5IGZvciB0aGUgZmVhdHVyZS4gIEZvciBleGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKlxuICogaW1wb3J0IEZlYXR1cmUgZnJvbSAnb2wvRmVhdHVyZSc7XG4gKiBpbXBvcnQgUG9seWdvbiBmcm9tICdvbC9nZW9tL1BvbHlnb24nO1xuICogaW1wb3J0IFBvaW50IGZyb20gJ29sL2dlb20vUG9pbnQnO1xuICpcbiAqIHZhciBmZWF0dXJlID0gbmV3IEZlYXR1cmUoe1xuICogICBnZW9tZXRyeTogbmV3IFBvbHlnb24ocG9seUNvb3JkcyksXG4gKiAgIGxhYmVsUG9pbnQ6IG5ldyBQb2ludChsYWJlbENvb3JkcyksXG4gKiAgIG5hbWU6ICdNeSBQb2x5Z29uJ1xuICogfSk7XG4gKlxuICogLy8gZ2V0IHRoZSBwb2x5Z29uIGdlb21ldHJ5XG4gKiB2YXIgcG9seSA9IGZlYXR1cmUuZ2V0R2VvbWV0cnkoKTtcbiAqXG4gKiAvLyBSZW5kZXIgdGhlIGZlYXR1cmUgYXMgYSBwb2ludCB1c2luZyB0aGUgY29vcmRpbmF0ZXMgZnJvbSBsYWJlbFBvaW50XG4gKiBmZWF0dXJlLnNldEdlb21ldHJ5TmFtZSgnbGFiZWxQb2ludCcpO1xuICpcbiAqIC8vIGdldCB0aGUgcG9pbnQgZ2VvbWV0cnlcbiAqIHZhciBwb2ludCA9IGZlYXR1cmUuZ2V0R2VvbWV0cnkoKTtcbiAqIGBgYFxuICpcbiAqIEBhcGlcbiAqIEB0ZW1wbGF0ZSB7aW1wb3J0KFwiLi9nZW9tL0dlb21ldHJ5LmpzXCIpLmRlZmF1bHR9IEdlb21ldHJ5XG4gKi9cbnZhciBGZWF0dXJlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhGZWF0dXJlLCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7R2VvbWV0cnl8T2JqZWN0PHN0cmluZywgKj49fSBvcHRfZ2VvbWV0cnlPclByb3BlcnRpZXNcbiAgICAgKiAgICAgWW91IG1heSBwYXNzIGEgR2VvbWV0cnkgb2JqZWN0IGRpcmVjdGx5LCBvciBhbiBvYmplY3QgbGl0ZXJhbCBjb250YWluaW5nXG4gICAgICogICAgIHByb3BlcnRpZXMuIElmIHlvdSBwYXNzIGFuIG9iamVjdCBsaXRlcmFsLCB5b3UgbWF5IGluY2x1ZGUgYSBHZW9tZXRyeVxuICAgICAqICAgICBhc3NvY2lhdGVkIHdpdGggYSBgZ2VvbWV0cnlgIGtleS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBGZWF0dXJlKG9wdF9nZW9tZXRyeU9yUHJvcGVydGllcykge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICAvKipcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICogQHR5cGUge251bWJlcnxzdHJpbmd8dW5kZWZpbmVkfVxuICAgICAgICAgKi9cbiAgICAgICAgX3RoaXMuaWRfID0gdW5kZWZpbmVkO1xuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIF90aGlzLmdlb21ldHJ5TmFtZV8gPSAnZ2VvbWV0cnknO1xuICAgICAgICAvKipcbiAgICAgICAgICogVXNlciBwcm92aWRlZCBzdHlsZS5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICogQHR5cGUge2ltcG9ydChcIi4vc3R5bGUvU3R5bGUuanNcIikuU3R5bGVMaWtlfVxuICAgICAgICAgKi9cbiAgICAgICAgX3RoaXMuc3R5bGVfID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEB0eXBlIHtpbXBvcnQoXCIuL3N0eWxlL1N0eWxlLmpzXCIpLlN0eWxlRnVuY3Rpb258dW5kZWZpbmVkfVxuICAgICAgICAgKi9cbiAgICAgICAgX3RoaXMuc3R5bGVGdW5jdGlvbl8gPSB1bmRlZmluZWQ7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAdHlwZSB7P2ltcG9ydChcIi4vZXZlbnRzLmpzXCIpLkV2ZW50c0tleX1cbiAgICAgICAgICovXG4gICAgICAgIF90aGlzLmdlb21ldHJ5Q2hhbmdlS2V5XyA9IG51bGw7XG4gICAgICAgIF90aGlzLmFkZEV2ZW50TGlzdGVuZXIoZ2V0Q2hhbmdlRXZlbnRUeXBlKF90aGlzLmdlb21ldHJ5TmFtZV8pLCBfdGhpcy5oYW5kbGVHZW9tZXRyeUNoYW5nZWRfKTtcbiAgICAgICAgaWYgKG9wdF9nZW9tZXRyeU9yUHJvcGVydGllcykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAoXG4gICAgICAgICAgICAvKiogQHR5cGUgez99ICovIChvcHRfZ2VvbWV0cnlPclByb3BlcnRpZXMpLmdldFNpbXBsaWZpZWRHZW9tZXRyeSkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB2YXIgZ2VvbWV0cnkgPSAvKiogQHR5cGUge0dlb21ldHJ5fSAqLyAob3B0X2dlb21ldHJ5T3JQcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRHZW9tZXRyeShnZW9tZXRyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvKiogQHR5cGUge09iamVjdDxzdHJpbmcsICo+fSAqL1xuICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0aWVzID0gb3B0X2dlb21ldHJ5T3JQcm9wZXJ0aWVzO1xuICAgICAgICAgICAgICAgIF90aGlzLnNldFByb3BlcnRpZXMocHJvcGVydGllcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbG9uZSB0aGlzIGZlYXR1cmUuIElmIHRoZSBvcmlnaW5hbCBmZWF0dXJlIGhhcyBhIGdlb21ldHJ5IGl0XG4gICAgICogaXMgYWxzbyBjbG9uZWQuIFRoZSBmZWF0dXJlIGlkIGlzIG5vdCBzZXQgaW4gdGhlIGNsb25lLlxuICAgICAqIEByZXR1cm4ge0ZlYXR1cmV9IFRoZSBjbG9uZS5cbiAgICAgKiBAYXBpXG4gICAgICovXG4gICAgRmVhdHVyZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjbG9uZSA9IG5ldyBGZWF0dXJlKHRoaXMuaGFzUHJvcGVydGllcygpID8gdGhpcy5nZXRQcm9wZXJ0aWVzKCkgOiBudWxsKTtcbiAgICAgICAgY2xvbmUuc2V0R2VvbWV0cnlOYW1lKHRoaXMuZ2V0R2VvbWV0cnlOYW1lKCkpO1xuICAgICAgICB2YXIgZ2VvbWV0cnkgPSB0aGlzLmdldEdlb21ldHJ5KCk7XG4gICAgICAgIGlmIChnZW9tZXRyeSkge1xuICAgICAgICAgICAgY2xvbmUuc2V0R2VvbWV0cnkoZ2VvbWV0cnkuY2xvbmUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0eWxlID0gdGhpcy5nZXRTdHlsZSgpO1xuICAgICAgICBpZiAoc3R5bGUpIHtcbiAgICAgICAgICAgIGNsb25lLnNldFN0eWxlKHN0eWxlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xvbmU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGZlYXR1cmUncyBkZWZhdWx0IGdlb21ldHJ5LiAgQSBmZWF0dXJlIG1heSBoYXZlIGFueSBudW1iZXIgb2YgbmFtZWRcbiAgICAgKiBnZW9tZXRyaWVzLiAgVGhlIFwiZGVmYXVsdFwiIGdlb21ldHJ5ICh0aGUgb25lIHRoYXQgaXMgcmVuZGVyZWQgYnkgZGVmYXVsdCkgaXNcbiAgICAgKiBzZXQgd2hlbiBjYWxsaW5nIHtAbGluayBtb2R1bGU6b2wvRmVhdHVyZX5GZWF0dXJlI3NldEdlb21ldHJ5fS5cbiAgICAgKiBAcmV0dXJuIHtHZW9tZXRyeXx1bmRlZmluZWR9IFRoZSBkZWZhdWx0IGdlb21ldHJ5IGZvciB0aGUgZmVhdHVyZS5cbiAgICAgKiBAYXBpXG4gICAgICogQG9ic2VydmFibGVcbiAgICAgKi9cbiAgICBGZWF0dXJlLnByb3RvdHlwZS5nZXRHZW9tZXRyeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIC8qKiBAdHlwZSB7R2VvbWV0cnl8dW5kZWZpbmVkfSAqLyAodGhpcy5nZXQodGhpcy5nZW9tZXRyeU5hbWVfKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGZlYXR1cmUgaWRlbnRpZmllci4gIFRoaXMgaXMgYSBzdGFibGUgaWRlbnRpZmllciBmb3IgdGhlIGZlYXR1cmUgYW5kXG4gICAgICogaXMgZWl0aGVyIHNldCB3aGVuIHJlYWRpbmcgZGF0YSBmcm9tIGEgcmVtb3RlIHNvdXJjZSBvciBzZXQgZXhwbGljaXRseSBieVxuICAgICAqIGNhbGxpbmcge0BsaW5rIG1vZHVsZTpvbC9GZWF0dXJlfkZlYXR1cmUjc2V0SWR9LlxuICAgICAqIEByZXR1cm4ge251bWJlcnxzdHJpbmd8dW5kZWZpbmVkfSBJZC5cbiAgICAgKiBAYXBpXG4gICAgICovXG4gICAgRmVhdHVyZS5wcm90b3R5cGUuZ2V0SWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkXztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbmFtZSBvZiB0aGUgZmVhdHVyZSdzIGRlZmF1bHQgZ2VvbWV0cnkuICBCeSBkZWZhdWx0LCB0aGUgZGVmYXVsdFxuICAgICAqIGdlb21ldHJ5IGlzIG5hbWVkIGBnZW9tZXRyeWAuXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBHZXQgdGhlIHByb3BlcnR5IG5hbWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBkZWZhdWx0IGdlb21ldHJ5XG4gICAgICogICAgIGZvciB0aGlzIGZlYXR1cmUuXG4gICAgICogQGFwaVxuICAgICAqL1xuICAgIEZlYXR1cmUucHJvdG90eXBlLmdldEdlb21ldHJ5TmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VvbWV0cnlOYW1lXztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZmVhdHVyZSdzIHN0eWxlLiBXaWxsIHJldHVybiB3aGF0IHdhcyBwcm92aWRlZCB0byB0aGVcbiAgICAgKiB7QGxpbmsgbW9kdWxlOm9sL0ZlYXR1cmV+RmVhdHVyZSNzZXRTdHlsZX0gbWV0aG9kLlxuICAgICAqIEByZXR1cm4ge2ltcG9ydChcIi4vc3R5bGUvU3R5bGUuanNcIikuU3R5bGVMaWtlfHVuZGVmaW5lZH0gVGhlIGZlYXR1cmUgc3R5bGUuXG4gICAgICogQGFwaVxuICAgICAqL1xuICAgIEZlYXR1cmUucHJvdG90eXBlLmdldFN0eWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdHlsZV87XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGZlYXR1cmUncyBzdHlsZSBmdW5jdGlvbi5cbiAgICAgKiBAcmV0dXJuIHtpbXBvcnQoXCIuL3N0eWxlL1N0eWxlLmpzXCIpLlN0eWxlRnVuY3Rpb258dW5kZWZpbmVkfSBSZXR1cm4gYSBmdW5jdGlvblxuICAgICAqIHJlcHJlc2VudGluZyB0aGUgY3VycmVudCBzdHlsZSBvZiB0aGlzIGZlYXR1cmUuXG4gICAgICogQGFwaVxuICAgICAqL1xuICAgIEZlYXR1cmUucHJvdG90eXBlLmdldFN0eWxlRnVuY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0eWxlRnVuY3Rpb25fO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBGZWF0dXJlLnByb3RvdHlwZS5oYW5kbGVHZW9tZXRyeUNoYW5nZV8gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlZCgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBGZWF0dXJlLnByb3RvdHlwZS5oYW5kbGVHZW9tZXRyeUNoYW5nZWRfID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5nZW9tZXRyeUNoYW5nZUtleV8pIHtcbiAgICAgICAgICAgIHVubGlzdGVuQnlLZXkodGhpcy5nZW9tZXRyeUNoYW5nZUtleV8pO1xuICAgICAgICAgICAgdGhpcy5nZW9tZXRyeUNoYW5nZUtleV8gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBnZW9tZXRyeSA9IHRoaXMuZ2V0R2VvbWV0cnkoKTtcbiAgICAgICAgaWYgKGdlb21ldHJ5KSB7XG4gICAgICAgICAgICB0aGlzLmdlb21ldHJ5Q2hhbmdlS2V5XyA9IGxpc3RlbihnZW9tZXRyeSwgRXZlbnRUeXBlLkNIQU5HRSwgdGhpcy5oYW5kbGVHZW9tZXRyeUNoYW5nZV8sIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hhbmdlZCgpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBkZWZhdWx0IGdlb21ldHJ5IGZvciB0aGUgZmVhdHVyZS4gIFRoaXMgd2lsbCB1cGRhdGUgdGhlIHByb3BlcnR5XG4gICAgICogd2l0aCB0aGUgbmFtZSByZXR1cm5lZCBieSB7QGxpbmsgbW9kdWxlOm9sL0ZlYXR1cmV+RmVhdHVyZSNnZXRHZW9tZXRyeU5hbWV9LlxuICAgICAqIEBwYXJhbSB7R2VvbWV0cnl8dW5kZWZpbmVkfSBnZW9tZXRyeSBUaGUgbmV3IGdlb21ldHJ5LlxuICAgICAqIEBhcGlcbiAgICAgKiBAb2JzZXJ2YWJsZVxuICAgICAqL1xuICAgIEZlYXR1cmUucHJvdG90eXBlLnNldEdlb21ldHJ5ID0gZnVuY3Rpb24gKGdlb21ldHJ5KSB7XG4gICAgICAgIHRoaXMuc2V0KHRoaXMuZ2VvbWV0cnlOYW1lXywgZ2VvbWV0cnkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBzdHlsZSBmb3IgdGhlIGZlYXR1cmUgdG8gb3ZlcnJpZGUgdGhlIGxheWVyIHN0eWxlLiAgVGhpcyBjYW4gYmUgYVxuICAgICAqIHNpbmdsZSBzdHlsZSBvYmplY3QsIGFuIGFycmF5IG9mIHN0eWxlcywgb3IgYSBmdW5jdGlvbiB0aGF0IHRha2VzIGFcbiAgICAgKiByZXNvbHV0aW9uIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIHN0eWxlcy4gVG8gdW5zZXQgdGhlIGZlYXR1cmUgc3R5bGUsIGNhbGxcbiAgICAgKiBgc2V0U3R5bGUoKWAgd2l0aG91dCBhcmd1bWVudHMgb3IgYSBmYWxzZXkgdmFsdWUuXG4gICAgICogQHBhcmFtIHtpbXBvcnQoXCIuL3N0eWxlL1N0eWxlLmpzXCIpLlN0eWxlTGlrZT19IG9wdF9zdHlsZSBTdHlsZSBmb3IgdGhpcyBmZWF0dXJlLlxuICAgICAqIEBhcGlcbiAgICAgKiBAZmlyZXMgbW9kdWxlOm9sL2V2ZW50cy9FdmVudH5CYXNlRXZlbnQjZXZlbnQ6Y2hhbmdlXG4gICAgICovXG4gICAgRmVhdHVyZS5wcm90b3R5cGUuc2V0U3R5bGUgPSBmdW5jdGlvbiAob3B0X3N0eWxlKSB7XG4gICAgICAgIHRoaXMuc3R5bGVfID0gb3B0X3N0eWxlO1xuICAgICAgICB0aGlzLnN0eWxlRnVuY3Rpb25fID0gIW9wdF9zdHlsZVxuICAgICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICAgIDogY3JlYXRlU3R5bGVGdW5jdGlvbihvcHRfc3R5bGUpO1xuICAgICAgICB0aGlzLmNoYW5nZWQoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldCB0aGUgZmVhdHVyZSBpZC4gIFRoZSBmZWF0dXJlIGlkIGlzIGNvbnNpZGVyZWQgc3RhYmxlIGFuZCBtYXkgYmUgdXNlZCB3aGVuXG4gICAgICogcmVxdWVzdGluZyBmZWF0dXJlcyBvciBjb21wYXJpbmcgaWRlbnRpZmllcnMgcmV0dXJuZWQgZnJvbSBhIHJlbW90ZSBzb3VyY2UuXG4gICAgICogVGhlIGZlYXR1cmUgaWQgY2FuIGJlIHVzZWQgd2l0aCB0aGVcbiAgICAgKiB7QGxpbmsgbW9kdWxlOm9sL3NvdXJjZS9WZWN0b3J+VmVjdG9yU291cmNlI2dldEZlYXR1cmVCeUlkfSBtZXRob2QuXG4gICAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfHVuZGVmaW5lZH0gaWQgVGhlIGZlYXR1cmUgaWQuXG4gICAgICogQGFwaVxuICAgICAqIEBmaXJlcyBtb2R1bGU6b2wvZXZlbnRzL0V2ZW50fkJhc2VFdmVudCNldmVudDpjaGFuZ2VcbiAgICAgKi9cbiAgICBGZWF0dXJlLnByb3RvdHlwZS5zZXRJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICB0aGlzLmlkXyA9IGlkO1xuICAgICAgICB0aGlzLmNoYW5nZWQoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNldCB0aGUgcHJvcGVydHkgbmFtZSB0byBiZSB1c2VkIHdoZW4gZ2V0dGluZyB0aGUgZmVhdHVyZSdzIGRlZmF1bHQgZ2VvbWV0cnkuXG4gICAgICogV2hlbiBjYWxsaW5nIHtAbGluayBtb2R1bGU6b2wvRmVhdHVyZX5GZWF0dXJlI2dldEdlb21ldHJ5fSwgdGhlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSB3aXRoXG4gICAgICogdGhpcyBuYW1lIHdpbGwgYmUgcmV0dXJuZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIHByb3BlcnR5IG5hbWUgb2YgdGhlIGRlZmF1bHQgZ2VvbWV0cnkuXG4gICAgICogQGFwaVxuICAgICAqL1xuICAgIEZlYXR1cmUucHJvdG90eXBlLnNldEdlb21ldHJ5TmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihnZXRDaGFuZ2VFdmVudFR5cGUodGhpcy5nZW9tZXRyeU5hbWVfKSwgdGhpcy5oYW5kbGVHZW9tZXRyeUNoYW5nZWRfKTtcbiAgICAgICAgdGhpcy5nZW9tZXRyeU5hbWVfID0gbmFtZTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGdldENoYW5nZUV2ZW50VHlwZSh0aGlzLmdlb21ldHJ5TmFtZV8pLCB0aGlzLmhhbmRsZUdlb21ldHJ5Q2hhbmdlZF8pO1xuICAgICAgICB0aGlzLmhhbmRsZUdlb21ldHJ5Q2hhbmdlZF8oKTtcbiAgICB9O1xuICAgIHJldHVybiBGZWF0dXJlO1xufShCYXNlT2JqZWN0KSk7XG4vKipcbiAqIENvbnZlcnQgdGhlIHByb3ZpZGVkIG9iamVjdCBpbnRvIGEgZmVhdHVyZSBzdHlsZSBmdW5jdGlvbi4gIEZ1bmN0aW9ucyBwYXNzZWRcbiAqIHRocm91Z2ggdW5jaGFuZ2VkLiAgQXJyYXlzIG9mIFN0eWxlIG9yIHNpbmdsZSBzdHlsZSBvYmplY3RzIHdyYXBwZWRcbiAqIGluIGEgbmV3IGZlYXR1cmUgc3R5bGUgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyFpbXBvcnQoXCIuL3N0eWxlL1N0eWxlLmpzXCIpLlN0eWxlRnVuY3Rpb258IUFycmF5PGltcG9ydChcIi4vc3R5bGUvU3R5bGUuanNcIikuZGVmYXVsdD58IWltcG9ydChcIi4vc3R5bGUvU3R5bGUuanNcIikuZGVmYXVsdH0gb2JqXG4gKiAgICAgQSBmZWF0dXJlIHN0eWxlIGZ1bmN0aW9uLCBhIHNpbmdsZSBzdHlsZSwgb3IgYW4gYXJyYXkgb2Ygc3R5bGVzLlxuICogQHJldHVybiB7aW1wb3J0KFwiLi9zdHlsZS9TdHlsZS5qc1wiKS5TdHlsZUZ1bmN0aW9ufSBBIHN0eWxlIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3R5bGVGdW5jdGlvbihvYmopIHtcbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtBcnJheTxpbXBvcnQoXCIuL3N0eWxlL1N0eWxlLmpzXCIpLmRlZmF1bHQ+fVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIHN0eWxlc18xO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICBzdHlsZXNfMSA9IG9iajtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFzc2VydCh0eXBlb2YgKCAvKiogQHR5cGUgez99ICovKG9iaikuZ2V0WkluZGV4KSA9PT0gJ2Z1bmN0aW9uJywgNDEpOyAvLyBFeHBlY3RlZCBhbiBgaW1wb3J0KFwiLi9zdHlsZS9TdHlsZS5qc1wiKS5TdHlsZWAgb3IgYW4gYXJyYXkgb2YgYGltcG9ydChcIi4vc3R5bGUvU3R5bGUuanNcIikuU3R5bGVgXG4gICAgICAgICAgICB2YXIgc3R5bGUgPSAvKiogQHR5cGUge2ltcG9ydChcIi4vc3R5bGUvU3R5bGUuanNcIikuZGVmYXVsdH0gKi8gKG9iaik7XG4gICAgICAgICAgICBzdHlsZXNfMSA9IFtzdHlsZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHlsZXNfMTtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBGZWF0dXJlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RmVhdHVyZS5qcy5tYXAiLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbi8qKlxuICogQG1vZHVsZSBvbC9PYmplY3RcbiAqL1xuaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnRzL0V2ZW50LmpzJztcbmltcG9ydCBPYmplY3RFdmVudFR5cGUgZnJvbSAnLi9PYmplY3RFdmVudFR5cGUuanMnO1xuaW1wb3J0IE9ic2VydmFibGUgZnJvbSAnLi9PYnNlcnZhYmxlLmpzJztcbmltcG9ydCB7IGFzc2lnbiwgaXNFbXB0eSB9IGZyb20gJy4vb2JqLmpzJztcbmltcG9ydCB7IGdldFVpZCB9IGZyb20gJy4vdXRpbC5qcyc7XG4vKipcbiAqIEBjbGFzc2Rlc2NcbiAqIEV2ZW50cyBlbWl0dGVkIGJ5IHtAbGluayBtb2R1bGU6b2wvT2JqZWN0fkJhc2VPYmplY3R9IGluc3RhbmNlcyBhcmUgaW5zdGFuY2VzIG9mIHRoaXMgdHlwZS5cbiAqL1xudmFyIE9iamVjdEV2ZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhPYmplY3RFdmVudCwgX3N1cGVyKTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUaGUgZXZlbnQgdHlwZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBwcm9wZXJ0eSBuYW1lLlxuICAgICAqIEBwYXJhbSB7Kn0gb2xkVmFsdWUgVGhlIG9sZCB2YWx1ZSBmb3IgYGtleWAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gT2JqZWN0RXZlbnQodHlwZSwga2V5LCBvbGRWYWx1ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCB0eXBlKSB8fCB0aGlzO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHdob3NlIHZhbHVlIGlzIGNoYW5naW5nLlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAYXBpXG4gICAgICAgICAqL1xuICAgICAgICBfdGhpcy5rZXkgPSBrZXk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgb2xkIHZhbHVlLiBUbyBnZXQgdGhlIG5ldyB2YWx1ZSB1c2UgYGUudGFyZ2V0LmdldChlLmtleSlgIHdoZXJlXG4gICAgICAgICAqIGBlYCBpcyB0aGUgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKiBAdHlwZSB7Kn1cbiAgICAgICAgICogQGFwaVxuICAgICAgICAgKi9cbiAgICAgICAgX3RoaXMub2xkVmFsdWUgPSBvbGRWYWx1ZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0RXZlbnQ7XG59KEV2ZW50KSk7XG5leHBvcnQgeyBPYmplY3RFdmVudCB9O1xuLyoqXG4gKiBAY2xhc3NkZXNjXG4gKiBBYnN0cmFjdCBiYXNlIGNsYXNzOyBub3JtYWxseSBvbmx5IHVzZWQgZm9yIGNyZWF0aW5nIHN1YmNsYXNzZXMgYW5kIG5vdFxuICogaW5zdGFudGlhdGVkIGluIGFwcHMuXG4gKiBNb3N0IG5vbi10cml2aWFsIGNsYXNzZXMgaW5oZXJpdCBmcm9tIHRoaXMuXG4gKlxuICogVGhpcyBleHRlbmRzIHtAbGluayBtb2R1bGU6b2wvT2JzZXJ2YWJsZX0gd2l0aCBvYnNlcnZhYmxlXG4gKiBwcm9wZXJ0aWVzLCB3aGVyZSBlYWNoIHByb3BlcnR5IGlzIG9ic2VydmFibGUgYXMgd2VsbCBhcyB0aGUgb2JqZWN0IGFzIGFcbiAqIHdob2xlLlxuICpcbiAqIENsYXNzZXMgdGhhdCBpbmhlcml0IGZyb20gdGhpcyBoYXZlIHByZS1kZWZpbmVkIHByb3BlcnRpZXMsIHRvIHdoaWNoIHlvdSBjYW5cbiAqIGFkZCB5b3VyIG93bnMuIFRoZSBwcmUtZGVmaW5lZCBwcm9wZXJ0aWVzIGFyZSBsaXN0ZWQgaW4gdGhpcyBkb2N1bWVudGF0aW9uIGFzXG4gKiAnT2JzZXJ2YWJsZSBQcm9wZXJ0aWVzJywgYW5kIGhhdmUgdGhlaXIgb3duIGFjY2Vzc29yczsgZm9yIGV4YW1wbGUsXG4gKiB7QGxpbmsgbW9kdWxlOm9sL01hcH5NYXB9IGhhcyBhIGB0YXJnZXRgIHByb3BlcnR5LCBhY2Nlc3NlZCB3aXRoXG4gKiBgZ2V0VGFyZ2V0KClgIGFuZCBjaGFuZ2VkIHdpdGggYHNldFRhcmdldCgpYC4gTm90IGFsbCBwcm9wZXJ0aWVzIGFyZSBob3dldmVyXG4gKiBzZXR0YWJsZS4gVGhlcmUgYXJlIGFsc28gZ2VuZXJhbC1wdXJwb3NlIGFjY2Vzc29ycyBgZ2V0KClgIGFuZCBgc2V0KClgLiBGb3JcbiAqIGV4YW1wbGUsIGBnZXQoJ3RhcmdldCcpYCBpcyBlcXVpdmFsZW50IHRvIGBnZXRUYXJnZXQoKWAuXG4gKlxuICogVGhlIGBzZXRgIGFjY2Vzc29ycyB0cmlnZ2VyIGEgY2hhbmdlIGV2ZW50LCBhbmQgeW91IGNhbiBtb25pdG9yIHRoaXMgYnlcbiAqIHJlZ2lzdGVyaW5nIGEgbGlzdGVuZXIuIEZvciBleGFtcGxlLCB7QGxpbmsgbW9kdWxlOm9sL1ZpZXd+Vmlld30gaGFzIGFcbiAqIGBjZW50ZXJgIHByb3BlcnR5LCBzbyBgdmlldy5vbignY2hhbmdlOmNlbnRlcicsIGZ1bmN0aW9uKGV2dCkgey4uLn0pO2Agd291bGRcbiAqIGNhbGwgdGhlIGZ1bmN0aW9uIHdoZW5ldmVyIHRoZSB2YWx1ZSBvZiB0aGUgY2VudGVyIHByb3BlcnR5IGNoYW5nZXMuIFdpdGhpblxuICogdGhlIGZ1bmN0aW9uLCBgZXZ0LnRhcmdldGAgd291bGQgYmUgdGhlIHZpZXcsIHNvIGBldnQudGFyZ2V0LmdldENlbnRlcigpYFxuICogd291bGQgcmV0dXJuIHRoZSBuZXcgY2VudGVyLlxuICpcbiAqIFlvdSBjYW4gYWRkIHlvdXIgb3duIG9ic2VydmFibGUgcHJvcGVydGllcyB3aXRoXG4gKiBgb2JqZWN0LnNldCgncHJvcCcsICd2YWx1ZScpYCwgYW5kIHJldHJpZXZlIHRoYXQgd2l0aCBgb2JqZWN0LmdldCgncHJvcCcpYC5cbiAqIFlvdSBjYW4gbGlzdGVuIGZvciBjaGFuZ2VzIG9uIHRoYXQgcHJvcGVydHkgdmFsdWUgd2l0aFxuICogYG9iamVjdC5vbignY2hhbmdlOnByb3AnLCBsaXN0ZW5lcilgLiBZb3UgY2FuIGdldCBhIGxpc3Qgb2YgYWxsXG4gKiBwcm9wZXJ0aWVzIHdpdGgge0BsaW5rIG1vZHVsZTpvbC9PYmplY3R+QmFzZU9iamVjdCNnZXRQcm9wZXJ0aWVzfS5cbiAqXG4gKiBOb3RlIHRoYXQgdGhlIG9ic2VydmFibGUgcHJvcGVydGllcyBhcmUgc2VwYXJhdGUgZnJvbSBzdGFuZGFyZCBKUyBwcm9wZXJ0aWVzLlxuICogWW91IGNhbiwgZm9yIGV4YW1wbGUsIGdpdmUgeW91ciBtYXAgb2JqZWN0IGEgdGl0bGUgd2l0aFxuICogYG1hcC50aXRsZT0nTmV3IHRpdGxlJ2AgYW5kIHdpdGggYG1hcC5zZXQoJ3RpdGxlJywgJ0Fub3RoZXIgdGl0bGUnKWAuIFRoZVxuICogZmlyc3Qgd2lsbCBiZSBhIGBoYXNPd25Qcm9wZXJ0eWA7IHRoZSBzZWNvbmQgd2lsbCBhcHBlYXIgaW5cbiAqIGBnZXRQcm9wZXJ0aWVzKClgLiBPbmx5IHRoZSBzZWNvbmQgaXMgb2JzZXJ2YWJsZS5cbiAqXG4gKiBQcm9wZXJ0aWVzIGNhbiBiZSBkZWxldGVkIGJ5IHVzaW5nIHRoZSB1bnNldCBtZXRob2QuIEUuZy5cbiAqIG9iamVjdC51bnNldCgnZm9vJykuXG4gKlxuICogQGZpcmVzIE9iamVjdEV2ZW50XG4gKiBAYXBpXG4gKi9cbnZhciBCYXNlT2JqZWN0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCYXNlT2JqZWN0LCBfc3VwZXIpO1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgKj49fSBvcHRfdmFsdWVzIEFuIG9iamVjdCB3aXRoIGtleS12YWx1ZSBwYWlycy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBCYXNlT2JqZWN0KG9wdF92YWx1ZXMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgLy8gQ2FsbCB7QGxpbmsgbW9kdWxlOm9sL3V0aWx+Z2V0VWlkfSB0byBlbnN1cmUgdGhhdCB0aGUgb3JkZXIgb2Ygb2JqZWN0cycgaWRzIGlzXG4gICAgICAgIC8vIHRoZSBzYW1lIGFzIHRoZSBvcmRlciBpbiB3aGljaCB0aGV5IHdlcmUgY3JlYXRlZC4gIFRoaXMgYWxzbyBoZWxwcyB0b1xuICAgICAgICAvLyBlbnN1cmUgdGhhdCBvYmplY3QgcHJvcGVydGllcyBhcmUgYWx3YXlzIGFkZGVkIGluIHRoZSBzYW1lIG9yZGVyLCB3aGljaFxuICAgICAgICAvLyBoZWxwcyBtYW55IEphdmFTY3JpcHQgZW5naW5lcyBnZW5lcmF0ZSBmYXN0ZXIgY29kZS5cbiAgICAgICAgZ2V0VWlkKF90aGlzKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCAqPn1cbiAgICAgICAgICovXG4gICAgICAgIF90aGlzLnZhbHVlc18gPSBudWxsO1xuICAgICAgICBpZiAob3B0X3ZhbHVlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBfdGhpcy5zZXRQcm9wZXJ0aWVzKG9wdF92YWx1ZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0cyBhIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgS2V5IG5hbWUuXG4gICAgICogQHJldHVybiB7Kn0gVmFsdWUuXG4gICAgICogQGFwaVxuICAgICAqL1xuICAgIEJhc2VPYmplY3QucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICBpZiAodGhpcy52YWx1ZXNfICYmIHRoaXMudmFsdWVzXy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMudmFsdWVzX1trZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBhIGxpc3Qgb2Ygb2JqZWN0IHByb3BlcnR5IG5hbWVzLlxuICAgICAqIEByZXR1cm4ge0FycmF5PHN0cmluZz59IExpc3Qgb2YgcHJvcGVydHkgbmFtZXMuXG4gICAgICogQGFwaVxuICAgICAqL1xuICAgIEJhc2VPYmplY3QucHJvdG90eXBlLmdldEtleXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy52YWx1ZXNfICYmIE9iamVjdC5rZXlzKHRoaXMudmFsdWVzXykpIHx8IFtdO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGFuIG9iamVjdCBvZiBhbGwgcHJvcGVydHkgbmFtZXMgYW5kIHZhbHVlcy5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3Q8c3RyaW5nLCAqPn0gT2JqZWN0LlxuICAgICAqIEBhcGlcbiAgICAgKi9cbiAgICBCYXNlT2JqZWN0LnByb3RvdHlwZS5nZXRQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMudmFsdWVzXyAmJiBhc3NpZ24oe30sIHRoaXMudmFsdWVzXykpIHx8IHt9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gVGhlIG9iamVjdCBoYXMgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgICBCYXNlT2JqZWN0LnByb3RvdHlwZS5oYXNQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLnZhbHVlc187XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IEtleSBuYW1lLlxuICAgICAqIEBwYXJhbSB7Kn0gb2xkVmFsdWUgT2xkIHZhbHVlLlxuICAgICAqL1xuICAgIEJhc2VPYmplY3QucHJvdG90eXBlLm5vdGlmeSA9IGZ1bmN0aW9uIChrZXksIG9sZFZhbHVlKSB7XG4gICAgICAgIHZhciBldmVudFR5cGU7XG4gICAgICAgIGV2ZW50VHlwZSA9IGdldENoYW5nZUV2ZW50VHlwZShrZXkpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE9iamVjdEV2ZW50KGV2ZW50VHlwZSwga2V5LCBvbGRWYWx1ZSkpO1xuICAgICAgICBldmVudFR5cGUgPSBPYmplY3RFdmVudFR5cGUuUFJPUEVSVFlDSEFOR0U7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgT2JqZWN0RXZlbnQoZXZlbnRUeXBlLCBrZXksIG9sZFZhbHVlKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXRzIGEgdmFsdWUuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBLZXkgbmFtZS5cbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdF9zaWxlbnQgVXBkYXRlIHdpdGhvdXQgdHJpZ2dlcmluZyBhbiBldmVudC5cbiAgICAgKiBAYXBpXG4gICAgICovXG4gICAgQmFzZU9iamVjdC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIG9wdF9zaWxlbnQpIHtcbiAgICAgICAgdmFyIHZhbHVlcyA9IHRoaXMudmFsdWVzXyB8fCAodGhpcy52YWx1ZXNfID0ge30pO1xuICAgICAgICBpZiAob3B0X3NpbGVudCkge1xuICAgICAgICAgICAgdmFsdWVzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBvbGRWYWx1ZSA9IHZhbHVlc1trZXldO1xuICAgICAgICAgICAgdmFsdWVzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmeShrZXksIG9sZFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0cyBhIGNvbGxlY3Rpb24gb2Yga2V5LXZhbHVlIHBhaXJzLiAgTm90ZSB0aGF0IHRoaXMgY2hhbmdlcyBhbnkgZXhpc3RpbmdcbiAgICAgKiBwcm9wZXJ0aWVzIGFuZCBhZGRzIG5ldyBvbmVzIChpdCBkb2VzIG5vdCByZW1vdmUgYW55IGV4aXN0aW5nIHByb3BlcnRpZXMpLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgKj59IHZhbHVlcyBWYWx1ZXMuXG4gICAgICogQHBhcmFtIHtib29sZWFuPX0gb3B0X3NpbGVudCBVcGRhdGUgd2l0aG91dCB0cmlnZ2VyaW5nIGFuIGV2ZW50LlxuICAgICAqIEBhcGlcbiAgICAgKi9cbiAgICBCYXNlT2JqZWN0LnByb3RvdHlwZS5zZXRQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKHZhbHVlcywgb3B0X3NpbGVudCkge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWVzKSB7XG4gICAgICAgICAgICB0aGlzLnNldChrZXksIHZhbHVlc1trZXldLCBvcHRfc2lsZW50KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVW5zZXRzIGEgcHJvcGVydHkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBLZXkgbmFtZS5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfc2lsZW50IFVuc2V0IHdpdGhvdXQgdHJpZ2dlcmluZyBhbiBldmVudC5cbiAgICAgKiBAYXBpXG4gICAgICovXG4gICAgQmFzZU9iamVjdC5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbiAoa2V5LCBvcHRfc2lsZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlc18gJiYga2V5IGluIHRoaXMudmFsdWVzXykge1xuICAgICAgICAgICAgdmFyIG9sZFZhbHVlID0gdGhpcy52YWx1ZXNfW2tleV07XG4gICAgICAgICAgICBkZWxldGUgdGhpcy52YWx1ZXNfW2tleV07XG4gICAgICAgICAgICBpZiAoaXNFbXB0eSh0aGlzLnZhbHVlc18pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNfID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghb3B0X3NpbGVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KGtleSwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQmFzZU9iamVjdDtcbn0oT2JzZXJ2YWJsZSkpO1xuLyoqXG4gKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn1cbiAqL1xudmFyIGNoYW5nZUV2ZW50VHlwZUNhY2hlID0ge307XG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgS2V5IG5hbWUuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IENoYW5nZSBuYW1lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hhbmdlRXZlbnRUeXBlKGtleSkge1xuICAgIHJldHVybiBjaGFuZ2VFdmVudFR5cGVDYWNoZS5oYXNPd25Qcm9wZXJ0eShrZXkpXG4gICAgICAgID8gY2hhbmdlRXZlbnRUeXBlQ2FjaGVba2V5XVxuICAgICAgICA6IChjaGFuZ2VFdmVudFR5cGVDYWNoZVtrZXldID0gJ2NoYW5nZTonICsga2V5KTtcbn1cbmV4cG9ydCBkZWZhdWx0IEJhc2VPYmplY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYmplY3QuanMubWFwIiwiLyoqXG4gKiBAbW9kdWxlIG9sL09iamVjdEV2ZW50VHlwZVxuICovXG4vKipcbiAqIEBlbnVtIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyZWQgd2hlbiBhIHByb3BlcnR5IGlzIGNoYW5nZWQuXG4gICAgICogQGV2ZW50IG1vZHVsZTpvbC9PYmplY3QuT2JqZWN0RXZlbnQjcHJvcGVydHljaGFuZ2VcbiAgICAgKiBAYXBpXG4gICAgICovXG4gICAgUFJPUEVSVFlDSEFOR0U6ICdwcm9wZXJ0eWNoYW5nZScsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JqZWN0RXZlbnRUeXBlLmpzLm1hcCIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuLyoqXG4gKiBAbW9kdWxlIG9sL09ic2VydmFibGVcbiAqL1xuaW1wb3J0IEV2ZW50VGFyZ2V0IGZyb20gJy4vZXZlbnRzL1RhcmdldC5qcyc7XG5pbXBvcnQgRXZlbnRUeXBlIGZyb20gJy4vZXZlbnRzL0V2ZW50VHlwZS5qcyc7XG5pbXBvcnQgeyBsaXN0ZW4sIGxpc3Rlbk9uY2UsIHVubGlzdGVuQnlLZXkgfSBmcm9tICcuL2V2ZW50cy5qcyc7XG4vKipcbiAqIEBjbGFzc2Rlc2NcbiAqIEFic3RyYWN0IGJhc2UgY2xhc3M7IG5vcm1hbGx5IG9ubHkgdXNlZCBmb3IgY3JlYXRpbmcgc3ViY2xhc3NlcyBhbmQgbm90XG4gKiBpbnN0YW50aWF0ZWQgaW4gYXBwcy5cbiAqIEFuIGV2ZW50IHRhcmdldCBwcm92aWRpbmcgY29udmVuaWVudCBtZXRob2RzIGZvciBsaXN0ZW5lciByZWdpc3RyYXRpb25cbiAqIGFuZCB1bnJlZ2lzdHJhdGlvbi4gQSBnZW5lcmljIGBjaGFuZ2VgIGV2ZW50IGlzIGFsd2F5cyBhdmFpbGFibGUgdGhyb3VnaFxuICoge0BsaW5rIG1vZHVsZTpvbC9PYnNlcnZhYmxlfk9ic2VydmFibGUjY2hhbmdlZH0uXG4gKlxuICogQGZpcmVzIGltcG9ydChcIi4vZXZlbnRzL0V2ZW50LmpzXCIpLmRlZmF1bHRcbiAqIEBhcGlcbiAqL1xudmFyIE9ic2VydmFibGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE9ic2VydmFibGUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gT2JzZXJ2YWJsZSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBfdGhpcy5yZXZpc2lvbl8gPSAwO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluY3JlYXNlcyB0aGUgcmV2aXNpb24gY291bnRlciBhbmQgZGlzcGF0Y2hlcyBhICdjaGFuZ2UnIGV2ZW50LlxuICAgICAqIEBhcGlcbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5jaGFuZ2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICArK3RoaXMucmV2aXNpb25fO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoRXZlbnRUeXBlLkNIQU5HRSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHZlcnNpb24gbnVtYmVyIGZvciB0aGlzIG9iamVjdC4gIEVhY2ggdGltZSB0aGUgb2JqZWN0IGlzIG1vZGlmaWVkLFxuICAgICAqIGl0cyB2ZXJzaW9uIG51bWJlciB3aWxsIGJlIGluY3JlbWVudGVkLlxuICAgICAqIEByZXR1cm4ge251bWJlcn0gUmV2aXNpb24uXG4gICAgICogQGFwaVxuICAgICAqL1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmdldFJldmlzaW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXZpc2lvbl87XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gZm9yIGEgY2VydGFpbiB0eXBlIG9mIGV2ZW50LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5PHN0cmluZz59IHR5cGUgVGhlIGV2ZW50IHR5cGUgb3IgYXJyYXkgb2YgZXZlbnQgdHlwZXMuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbig/KTogP30gbGlzdGVuZXIgVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICAgICAqIEByZXR1cm4ge2ltcG9ydChcIi4vZXZlbnRzLmpzXCIpLkV2ZW50c0tleXxBcnJheTxpbXBvcnQoXCIuL2V2ZW50cy5qc1wiKS5FdmVudHNLZXk+fSBVbmlxdWUga2V5IGZvciB0aGUgbGlzdGVuZXIuIElmXG4gICAgICogICAgIGNhbGxlZCB3aXRoIGFuIGFycmF5IG9mIGV2ZW50IHR5cGVzIGFzIHRoZSBmaXJzdCBhcmd1bWVudCwgdGhlIHJldHVyblxuICAgICAqICAgICB3aWxsIGJlIGFuIGFycmF5IG9mIGtleXMuXG4gICAgICogQGFwaVxuICAgICAqL1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgICAgICAgICB2YXIgbGVuID0gdHlwZS5sZW5ndGg7XG4gICAgICAgICAgICB2YXIga2V5cyA9IG5ldyBBcnJheShsZW4pO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgICAgIGtleXNbaV0gPSBsaXN0ZW4odGhpcywgdHlwZVtpXSwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdGVuKHRoaXMsIC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAodHlwZSksIGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogTGlzdGVuIG9uY2UgZm9yIGEgY2VydGFpbiB0eXBlIG9mIGV2ZW50LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5PHN0cmluZz59IHR5cGUgVGhlIGV2ZW50IHR5cGUgb3IgYXJyYXkgb2YgZXZlbnQgdHlwZXMuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbig/KTogP30gbGlzdGVuZXIgVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICAgICAqIEByZXR1cm4ge2ltcG9ydChcIi4vZXZlbnRzLmpzXCIpLkV2ZW50c0tleXxBcnJheTxpbXBvcnQoXCIuL2V2ZW50cy5qc1wiKS5FdmVudHNLZXk+fSBVbmlxdWUga2V5IGZvciB0aGUgbGlzdGVuZXIuIElmXG4gICAgICogICAgIGNhbGxlZCB3aXRoIGFuIGFycmF5IG9mIGV2ZW50IHR5cGVzIGFzIHRoZSBmaXJzdCBhcmd1bWVudCwgdGhlIHJldHVyblxuICAgICAqICAgICB3aWxsIGJlIGFuIGFycmF5IG9mIGtleXMuXG4gICAgICogQGFwaVxuICAgICAqL1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodHlwZSkpIHtcbiAgICAgICAgICAgIHZhciBsZW4gPSB0eXBlLmxlbmd0aDtcbiAgICAgICAgICAgIGtleSA9IG5ldyBBcnJheShsZW4pO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgICAgIGtleVtpXSA9IGxpc3Rlbk9uY2UodGhpcywgdHlwZVtpXSwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAga2V5ID0gbGlzdGVuT25jZSh0aGlzLCAvKiogQHR5cGUge3N0cmluZ30gKi8gKHR5cGUpLCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgLyoqIEB0eXBlIHtPYmplY3R9ICovIChsaXN0ZW5lcikub2xfa2V5ID0ga2V5O1xuICAgICAgICByZXR1cm4ga2V5O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVW5saXN0ZW4gZm9yIGEgY2VydGFpbiB0eXBlIG9mIGV2ZW50LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5PHN0cmluZz59IHR5cGUgVGhlIGV2ZW50IHR5cGUgb3IgYXJyYXkgb2YgZXZlbnQgdHlwZXMuXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbig/KTogP30gbGlzdGVuZXIgVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICAgICAqIEBhcGlcbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS51biA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIga2V5ID0gLyoqIEB0eXBlIHtPYmplY3R9ICovIChsaXN0ZW5lcikub2xfa2V5O1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICB1bkJ5S2V5KGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0eXBlKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGlpID0gdHlwZS5sZW5ndGg7IGkgPCBpaTsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGVbaV0sIGxpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlO1xufShFdmVudFRhcmdldCkpO1xuLyoqXG4gKiBSZW1vdmVzIGFuIGV2ZW50IGxpc3RlbmVyIHVzaW5nIHRoZSBrZXkgcmV0dXJuZWQgYnkgYG9uKClgIG9yIGBvbmNlKClgLlxuICogQHBhcmFtIHtpbXBvcnQoXCIuL2V2ZW50cy5qc1wiKS5FdmVudHNLZXl8QXJyYXk8aW1wb3J0KFwiLi9ldmVudHMuanNcIikuRXZlbnRzS2V5Pn0ga2V5IFRoZSBrZXkgcmV0dXJuZWQgYnkgYG9uKClgXG4gKiAgICAgb3IgYG9uY2UoKWAgKG9yIGFuIGFycmF5IG9mIGtleXMpLlxuICogQGFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5CeUtleShrZXkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShrZXkpKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBpaSA9IGtleS5sZW5ndGg7IGkgPCBpaTsgKytpKSB7XG4gICAgICAgICAgICB1bmxpc3RlbkJ5S2V5KGtleVtpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHVubGlzdGVuQnlLZXkoLyoqIEB0eXBlIHtpbXBvcnQoXCIuL2V2ZW50cy5qc1wiKS5FdmVudHNLZXl9ICovIChrZXkpKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBPYnNlcnZhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9T2JzZXJ2YWJsZS5qcy5tYXAiLCIvKipcbiAqIEBtb2R1bGUgb2wvYXJyYXlcbiAqL1xuLyoqXG4gKiBQZXJmb3JtcyBhIGJpbmFyeSBzZWFyY2ggb24gdGhlIHByb3ZpZGVkIHNvcnRlZCBsaXN0IGFuZCByZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgaXRlbSBpZiBmb3VuZC4gSWYgaXQgY2FuJ3QgYmUgZm91bmQgaXQnbGwgcmV0dXJuIC0xLlxuICogaHR0cHM6Ly9naXRodWIuY29tL2Rhcmtza3lhcHAvYmluYXJ5LXNlYXJjaFxuICpcbiAqIEBwYXJhbSB7QXJyYXk8Kj59IGhheXN0YWNrIEl0ZW1zIHRvIHNlYXJjaCB0aHJvdWdoLlxuICogQHBhcmFtIHsqfSBuZWVkbGUgVGhlIGl0ZW0gdG8gbG9vayBmb3IuXG4gKiBAcGFyYW0ge0Z1bmN0aW9uPX0gb3B0X2NvbXBhcmF0b3IgQ29tcGFyYXRvciBmdW5jdGlvbi5cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGluZGV4IG9mIHRoZSBpdGVtIGlmIGZvdW5kLCAtMSBpZiBub3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5hcnlTZWFyY2goaGF5c3RhY2ssIG5lZWRsZSwgb3B0X2NvbXBhcmF0b3IpIHtcbiAgICB2YXIgbWlkLCBjbXA7XG4gICAgdmFyIGNvbXBhcmF0b3IgPSBvcHRfY29tcGFyYXRvciB8fCBudW1iZXJTYWZlQ29tcGFyZUZ1bmN0aW9uO1xuICAgIHZhciBsb3cgPSAwO1xuICAgIHZhciBoaWdoID0gaGF5c3RhY2subGVuZ3RoO1xuICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgIHdoaWxlIChsb3cgPCBoaWdoKSB7XG4gICAgICAgIC8qIE5vdGUgdGhhdCBcIihsb3cgKyBoaWdoKSA+Pj4gMVwiIG1heSBvdmVyZmxvdywgYW5kIHJlc3VsdHMgaW4gYSB0eXBlY2FzdFxuICAgICAgICAgKiB0byBkb3VibGUgKHdoaWNoIGdpdmVzIHRoZSB3cm9uZyByZXN1bHRzKS4gKi9cbiAgICAgICAgbWlkID0gbG93ICsgKChoaWdoIC0gbG93KSA+PiAxKTtcbiAgICAgICAgY21wID0gK2NvbXBhcmF0b3IoaGF5c3RhY2tbbWlkXSwgbmVlZGxlKTtcbiAgICAgICAgaWYgKGNtcCA8IDAuMCkge1xuICAgICAgICAgICAgLyogVG9vIGxvdy4gKi9cbiAgICAgICAgICAgIGxvdyA9IG1pZCArIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvKiBLZXkgZm91bmQgb3IgdG9vIGhpZ2ggKi9cbiAgICAgICAgICAgIGhpZ2ggPSBtaWQ7XG4gICAgICAgICAgICBmb3VuZCA9ICFjbXA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyogS2V5IG5vdCBmb3VuZC4gKi9cbiAgICByZXR1cm4gZm91bmQgPyBsb3cgOiB+bG93O1xufVxuLyoqXG4gKiBDb21wYXJlIGZ1bmN0aW9uIGZvciBhcnJheSBzb3J0IHRoYXQgaXMgc2FmZSBmb3IgbnVtYmVycy5cbiAqIEBwYXJhbSB7Kn0gYSBUaGUgZmlyc3Qgb2JqZWN0IHRvIGJlIGNvbXBhcmVkLlxuICogQHBhcmFtIHsqfSBiIFRoZSBzZWNvbmQgb2JqZWN0IHRvIGJlIGNvbXBhcmVkLlxuICogQHJldHVybiB7bnVtYmVyfSBBIG5lZ2F0aXZlIG51bWJlciwgemVybywgb3IgYSBwb3NpdGl2ZSBudW1iZXIgYXMgdGhlIGZpcnN0XG4gKiAgICAgYXJndW1lbnQgaXMgbGVzcyB0aGFuLCBlcXVhbCB0bywgb3IgZ3JlYXRlciB0aGFuIHRoZSBzZWNvbmQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBudW1iZXJTYWZlQ29tcGFyZUZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYSA+IGIgPyAxIDogYSA8IGIgPyAtMSA6IDA7XG59XG4vKipcbiAqIFdoZXRoZXIgdGhlIGFycmF5IGNvbnRhaW5zIHRoZSBnaXZlbiBvYmplY3QuXG4gKiBAcGFyYW0ge0FycmF5PCo+fSBhcnIgVGhlIGFycmF5IHRvIHRlc3QgZm9yIHRoZSBwcmVzZW5jZSBvZiB0aGUgZWxlbWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqIFRoZSBvYmplY3QgZm9yIHdoaWNoIHRvIHRlc3QuXG4gKiBAcmV0dXJuIHtib29sZWFufSBUaGUgb2JqZWN0IGlzIGluIHRoZSBhcnJheS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluY2x1ZGVzKGFyciwgb2JqKSB7XG4gICAgcmV0dXJuIGFyci5pbmRleE9mKG9iaikgPj0gMDtcbn1cbi8qKlxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBhcnIgQXJyYXkuXG4gKiBAcGFyYW0ge251bWJlcn0gdGFyZ2V0IFRhcmdldC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkaXJlY3Rpb24gMCBtZWFucyByZXR1cm4gdGhlIG5lYXJlc3QsID4gMFxuICogICAgbWVhbnMgcmV0dXJuIHRoZSBsYXJnZXN0IG5lYXJlc3QsIDwgMCBtZWFucyByZXR1cm4gdGhlXG4gKiAgICBzbWFsbGVzdCBuZWFyZXN0LlxuICogQHJldHVybiB7bnVtYmVyfSBJbmRleC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxpbmVhckZpbmROZWFyZXN0KGFyciwgdGFyZ2V0LCBkaXJlY3Rpb24pIHtcbiAgICB2YXIgbiA9IGFyci5sZW5ndGg7XG4gICAgaWYgKGFyclswXSA8PSB0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRhcmdldCA8PSBhcnJbbiAtIDFdKSB7XG4gICAgICAgIHJldHVybiBuIC0gMTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBpID0gdm9pZCAwO1xuICAgICAgICBpZiAoZGlyZWN0aW9uID4gMCkge1xuICAgICAgICAgICAgZm9yIChpID0gMTsgaSA8IG47ICsraSkge1xuICAgICAgICAgICAgICAgIGlmIChhcnJbaV0gPCB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGkgLSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkaXJlY3Rpb24gPCAwKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAxOyBpIDwgbjsgKytpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFycltpXSA8PSB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChpID0gMTsgaSA8IG47ICsraSkge1xuICAgICAgICAgICAgICAgIGlmIChhcnJbaV0gPT0gdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChhcnJbaV0gPCB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFycltpIC0gMV0gLSB0YXJnZXQgPCB0YXJnZXQgLSBhcnJbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuIC0gMTtcbiAgICB9XG59XG4vKipcbiAqIEBwYXJhbSB7QXJyYXk8Kj59IGFyciBBcnJheS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiZWdpbiBCZWdpbiBpbmRleC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgRW5kIGluZGV4LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmV2ZXJzZVN1YkFycmF5KGFyciwgYmVnaW4sIGVuZCkge1xuICAgIHdoaWxlIChiZWdpbiA8IGVuZCkge1xuICAgICAgICB2YXIgdG1wID0gYXJyW2JlZ2luXTtcbiAgICAgICAgYXJyW2JlZ2luXSA9IGFycltlbmRdO1xuICAgICAgICBhcnJbZW5kXSA9IHRtcDtcbiAgICAgICAgKytiZWdpbjtcbiAgICAgICAgLS1lbmQ7XG4gICAgfVxufVxuLyoqXG4gKiBAcGFyYW0ge0FycmF5PFZBTFVFPn0gYXJyIFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0geyFBcnJheTxWQUxVRT58VkFMVUV9IGRhdGEgVGhlIGVsZW1lbnRzIG9yIGFycmF5cyBvZiBlbGVtZW50cyB0byBhZGQgdG8gYXJyLlxuICogQHRlbXBsYXRlIFZBTFVFXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQoYXJyLCBkYXRhKSB7XG4gICAgdmFyIGV4dGVuc2lvbiA9IEFycmF5LmlzQXJyYXkoZGF0YSkgPyBkYXRhIDogW2RhdGFdO1xuICAgIHZhciBsZW5ndGggPSBleHRlbnNpb24ubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXJyW2Fyci5sZW5ndGhdID0gZXh0ZW5zaW9uW2ldO1xuICAgIH1cbn1cbi8qKlxuICogQHBhcmFtIHtBcnJheTxWQUxVRT59IGFyciBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtWQUxVRX0gb2JqIFRoZSBlbGVtZW50IHRvIHJlbW92ZS5cbiAqIEB0ZW1wbGF0ZSBWQUxVRVxuICogQHJldHVybiB7Ym9vbGVhbn0gSWYgdGhlIGVsZW1lbnQgd2FzIHJlbW92ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmUoYXJyLCBvYmopIHtcbiAgICB2YXIgaSA9IGFyci5pbmRleE9mKG9iaik7XG4gICAgdmFyIGZvdW5kID0gaSA+IC0xO1xuICAgIGlmIChmb3VuZCkge1xuICAgICAgICBhcnIuc3BsaWNlKGksIDEpO1xuICAgIH1cbiAgICByZXR1cm4gZm91bmQ7XG59XG4vKipcbiAqIEBwYXJhbSB7QXJyYXk8VkFMVUU+fSBhcnIgVGhlIGFycmF5IHRvIHNlYXJjaCBpbi5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oVkFMVUUsIG51bWJlciwgPykgOiBib29sZWFufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjb21wYXJlLlxuICogQHRlbXBsYXRlIFZBTFVFXG4gKiBAcmV0dXJuIHtWQUxVRXxudWxsfSBUaGUgZWxlbWVudCBmb3VuZCBvciBudWxsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZChhcnIsIGZ1bmMpIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aCA+Pj4gMDtcbiAgICB2YXIgdmFsdWU7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YWx1ZSA9IGFycltpXTtcbiAgICAgICAgaWYgKGZ1bmModmFsdWUsIGksIGFycikpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbi8qKlxuICogQHBhcmFtIHtBcnJheXxVaW50OENsYW1wZWRBcnJheX0gYXJyMSBUaGUgZmlyc3QgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7QXJyYXl8VWludDhDbGFtcGVkQXJyYXl9IGFycjIgVGhlIHNlY29uZCBhcnJheSB0byBjb21wYXJlLlxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciB0aGUgdHdvIGFycmF5cyBhcmUgZXF1YWwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbHMoYXJyMSwgYXJyMikge1xuICAgIHZhciBsZW4xID0gYXJyMS5sZW5ndGg7XG4gICAgaWYgKGxlbjEgIT09IGFycjIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW4xOyBpKyspIHtcbiAgICAgICAgaWYgKGFycjFbaV0gIT09IGFycjJbaV0pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbi8qKlxuICogU29ydCB0aGUgcGFzc2VkIGFycmF5IHN1Y2ggdGhhdCB0aGUgcmVsYXRpdmUgb3JkZXIgb2YgZXF1YWwgZWxlbWVudHMgaXMgcHJldmVydmVkLlxuICogU2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1NvcnRpbmdfYWxnb3JpdGhtI1N0YWJpbGl0eSBmb3IgZGV0YWlscy5cbiAqIEBwYXJhbSB7QXJyYXk8Kj59IGFyciBUaGUgYXJyYXkgdG8gc29ydCAobW9kaWZpZXMgb3JpZ2luYWwpLlxuICogQHBhcmFtIHshZnVuY3Rpb24oKiwgKik6IG51bWJlcn0gY29tcGFyZUZuYyBDb21wYXJpc29uIGZ1bmN0aW9uLlxuICogQGFwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3RhYmxlU29ydChhcnIsIGNvbXBhcmVGbmMpIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aDtcbiAgICB2YXIgdG1wID0gQXJyYXkoYXJyLmxlbmd0aCk7XG4gICAgdmFyIGk7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRtcFtpXSA9IHsgaW5kZXg6IGksIHZhbHVlOiBhcnJbaV0gfTtcbiAgICB9XG4gICAgdG1wLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVGbmMoYS52YWx1ZSwgYi52YWx1ZSkgfHwgYS5pbmRleCAtIGIuaW5kZXg7XG4gICAgfSk7XG4gICAgZm9yIChpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICBhcnJbaV0gPSB0bXBbaV0udmFsdWU7XG4gICAgfVxufVxuLyoqXG4gKiBAcGFyYW0ge0FycmF5PCo+fSBhcnIgVGhlIGFycmF5IHRvIHNlYXJjaCBpbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgQ29tcGFyaXNvbiBmdW5jdGlvbi5cbiAqIEByZXR1cm4ge251bWJlcn0gUmV0dXJuIGluZGV4LlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZEluZGV4KGFyciwgZnVuYykge1xuICAgIHZhciBpbmRleDtcbiAgICB2YXIgZm91bmQgPSAhYXJyLmV2ZXJ5KGZ1bmN0aW9uIChlbCwgaWR4KSB7XG4gICAgICAgIGluZGV4ID0gaWR4O1xuICAgICAgICByZXR1cm4gIWZ1bmMoZWwsIGlkeCwgYXJyKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZm91bmQgPyBpbmRleCA6IC0xO1xufVxuLyoqXG4gKiBAcGFyYW0ge0FycmF5PCo+fSBhcnIgVGhlIGFycmF5IHRvIHRlc3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9uPX0gb3B0X2Z1bmMgQ29tcGFyaXNvbiBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbj19IG9wdF9zdHJpY3QgU3RyaWN0bHkgc29ydGVkIChkZWZhdWx0IGZhbHNlKS5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFJldHVybiBpbmRleC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU29ydGVkKGFyciwgb3B0X2Z1bmMsIG9wdF9zdHJpY3QpIHtcbiAgICB2YXIgY29tcGFyZSA9IG9wdF9mdW5jIHx8IG51bWJlclNhZmVDb21wYXJlRnVuY3Rpb247XG4gICAgcmV0dXJuIGFyci5ldmVyeShmdW5jdGlvbiAoY3VycmVudFZhbCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzID0gY29tcGFyZShhcnJbaW5kZXggLSAxXSwgY3VycmVudFZhbCk7XG4gICAgICAgIHJldHVybiAhKHJlcyA+IDAgfHwgKG9wdF9zdHJpY3QgJiYgcmVzID09PSAwKSk7XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheS5qcy5tYXAiLCIvKipcbiAqIEBtb2R1bGUgb2wvYXNzZXJ0c1xuICovXG5pbXBvcnQgQXNzZXJ0aW9uRXJyb3IgZnJvbSAnLi9Bc3NlcnRpb25FcnJvci5qcyc7XG4vKipcbiAqIEBwYXJhbSB7Kn0gYXNzZXJ0aW9uIEFzc2VydGlvbiB3ZSBleHBlY3RlZCB0byBiZSB0cnV0aHkuXG4gKiBAcGFyYW0ge251bWJlcn0gZXJyb3JDb2RlIEVycm9yIGNvZGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnQoYXNzZXJ0aW9uLCBlcnJvckNvZGUpIHtcbiAgICBpZiAoIWFzc2VydGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoZXJyb3JDb2RlKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hc3NlcnRzLmpzLm1hcCIsIi8qKlxuICogQG1vZHVsZSBvbC9ldmVudHNcbiAqL1xuaW1wb3J0IHsgY2xlYXIgfSBmcm9tICcuL29iai5qcyc7XG4vKipcbiAqIEtleSB0byB1c2Ugd2l0aCB7QGxpbmsgbW9kdWxlOm9sL09ic2VydmFibGV+T2JzZXJ2YWJsZSN1bkJ5S2V5fS5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IEV2ZW50c0tleVxuICogQHByb3BlcnR5IHtMaXN0ZW5lckZ1bmN0aW9ufSBsaXN0ZW5lclxuICogQHByb3BlcnR5IHtpbXBvcnQoXCIuL2V2ZW50cy9UYXJnZXQuanNcIikuRXZlbnRUYXJnZXRMaWtlfSB0YXJnZXRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0eXBlXG4gKiBAYXBpXG4gKi9cbi8qKlxuICogTGlzdGVuZXIgZnVuY3Rpb24uIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGggYW4gZXZlbnQgb2JqZWN0IGFzIGFyZ3VtZW50LlxuICogV2hlbiB0aGUgZnVuY3Rpb24gcmV0dXJucyBgZmFsc2VgLCBldmVudCBwcm9wYWdhdGlvbiB3aWxsIHN0b3AuXG4gKlxuICogQHR5cGVkZWYge2Z1bmN0aW9uKChFdmVudHxpbXBvcnQoXCIuL2V2ZW50cy9FdmVudC5qc1wiKS5kZWZhdWx0KSk6ICh2b2lkfGJvb2xlYW4pfSBMaXN0ZW5lckZ1bmN0aW9uXG4gKiBAYXBpXG4gKi9cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTGlzdGVuZXJPYmplY3RcbiAqIEBwcm9wZXJ0eSB7TGlzdGVuZXJGdW5jdGlvbn0gaGFuZGxlRXZlbnRcbiAqL1xuLyoqXG4gKiBAdHlwZWRlZiB7TGlzdGVuZXJGdW5jdGlvbnxMaXN0ZW5lck9iamVjdH0gTGlzdGVuZXJcbiAqL1xuLyoqXG4gKiBSZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIgb24gYW4gZXZlbnQgdGFyZ2V0LiBJbnNwaXJlZCBieVxuICogaHR0cHM6Ly9nb29nbGUuZ2l0aHViLmlvL2Nsb3N1cmUtbGlicmFyeS9hcGkvc291cmNlL2Nsb3N1cmUvZ29vZy9ldmVudHMvZXZlbnRzLmpzLnNyYy5odG1sXG4gKlxuICogVGhpcyBmdW5jdGlvbiBlZmZpY2llbnRseSBiaW5kcyBhIGBsaXN0ZW5lcmAgdG8gYSBgdGhpc2Agb2JqZWN0LCBhbmQgcmV0dXJuc1xuICogYSBrZXkgZm9yIHVzZSB3aXRoIHtAbGluayBtb2R1bGU6b2wvZXZlbnRzfnVubGlzdGVuQnlLZXl9LlxuICpcbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi9ldmVudHMvVGFyZ2V0LmpzXCIpLkV2ZW50VGFyZ2V0TGlrZX0gdGFyZ2V0IEV2ZW50IHRhcmdldC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIEV2ZW50IHR5cGUuXG4gKiBAcGFyYW0ge0xpc3RlbmVyRnVuY3Rpb259IGxpc3RlbmVyIExpc3RlbmVyLlxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRfdGhpcyBPYmplY3QgcmVmZXJlbmNlZCBieSB0aGUgYHRoaXNgIGtleXdvcmQgaW4gdGhlXG4gKiAgICAgbGlzdGVuZXIuIERlZmF1bHQgaXMgdGhlIGB0YXJnZXRgLlxuICogQHBhcmFtIHtib29sZWFuPX0gb3B0X29uY2UgSWYgdHJ1ZSwgYWRkIHRoZSBsaXN0ZW5lciBhcyBvbmUtb2ZmIGxpc3RlbmVyLlxuICogQHJldHVybiB7RXZlbnRzS2V5fSBVbmlxdWUga2V5IGZvciB0aGUgbGlzdGVuZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW4odGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgb3B0X3RoaXMsIG9wdF9vbmNlKSB7XG4gICAgaWYgKG9wdF90aGlzICYmIG9wdF90aGlzICE9PSB0YXJnZXQpIHtcbiAgICAgICAgbGlzdGVuZXIgPSBsaXN0ZW5lci5iaW5kKG9wdF90aGlzKTtcbiAgICB9XG4gICAgaWYgKG9wdF9vbmNlKSB7XG4gICAgICAgIHZhciBvcmlnaW5hbExpc3RlbmVyXzEgPSBsaXN0ZW5lcjtcbiAgICAgICAgbGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyXzEuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgdmFyIGV2ZW50c0tleSA9IHtcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lcixcbiAgICB9O1xuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcbiAgICByZXR1cm4gZXZlbnRzS2V5O1xufVxuLyoqXG4gKiBSZWdpc3RlcnMgYSBvbmUtb2ZmIGV2ZW50IGxpc3RlbmVyIG9uIGFuIGV2ZW50IHRhcmdldC4gSW5zcGlyZWQgYnlcbiAqIGh0dHBzOi8vZ29vZ2xlLmdpdGh1Yi5pby9jbG9zdXJlLWxpYnJhcnkvYXBpL3NvdXJjZS9jbG9zdXJlL2dvb2cvZXZlbnRzL2V2ZW50cy5qcy5zcmMuaHRtbFxuICpcbiAqIFRoaXMgZnVuY3Rpb24gZWZmaWNpZW50bHkgYmluZHMgYSBgbGlzdGVuZXJgIGFzIHNlbGYtdW5yZWdpc3RlcmluZyBsaXN0ZW5lclxuICogdG8gYSBgdGhpc2Agb2JqZWN0LCBhbmQgcmV0dXJucyBhIGtleSBmb3IgdXNlIHdpdGhcbiAqIHtAbGluayBtb2R1bGU6b2wvZXZlbnRzfnVubGlzdGVuQnlLZXl9IGluIGNhc2UgdGhlIGxpc3RlbmVyIG5lZWRzIHRvIGJlXG4gKiB1bnJlZ2lzdGVyZWQgYmVmb3JlIGl0IGlzIGNhbGxlZC5cbiAqXG4gKiBXaGVuIHtAbGluayBtb2R1bGU6b2wvZXZlbnRzfmxpc3Rlbn0gaXMgY2FsbGVkIHdpdGggdGhlIHNhbWUgYXJndW1lbnRzIGFmdGVyIHRoaXNcbiAqIGZ1bmN0aW9uLCB0aGUgc2VsZi11bnJlZ2lzdGVyaW5nIGxpc3RlbmVyIHdpbGwgYmUgdHVybmVkIGludG8gYSBwZXJtYW5lbnRcbiAqIGxpc3RlbmVyLlxuICpcbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi9ldmVudHMvVGFyZ2V0LmpzXCIpLkV2ZW50VGFyZ2V0TGlrZX0gdGFyZ2V0IEV2ZW50IHRhcmdldC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIEV2ZW50IHR5cGUuXG4gKiBAcGFyYW0ge0xpc3RlbmVyRnVuY3Rpb259IGxpc3RlbmVyIExpc3RlbmVyLlxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRfdGhpcyBPYmplY3QgcmVmZXJlbmNlZCBieSB0aGUgYHRoaXNgIGtleXdvcmQgaW4gdGhlXG4gKiAgICAgbGlzdGVuZXIuIERlZmF1bHQgaXMgdGhlIGB0YXJnZXRgLlxuICogQHJldHVybiB7RXZlbnRzS2V5fSBLZXkgZm9yIHVubGlzdGVuQnlLZXkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsaXN0ZW5PbmNlKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIG9wdF90aGlzKSB7XG4gICAgcmV0dXJuIGxpc3Rlbih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBvcHRfdGhpcywgdHJ1ZSk7XG59XG4vKipcbiAqIFVucmVnaXN0ZXJzIGV2ZW50IGxpc3RlbmVycyBvbiBhbiBldmVudCB0YXJnZXQuIEluc3BpcmVkIGJ5XG4gKiBodHRwczovL2dvb2dsZS5naXRodWIuaW8vY2xvc3VyZS1saWJyYXJ5L2FwaS9zb3VyY2UvY2xvc3VyZS9nb29nL2V2ZW50cy9ldmVudHMuanMuc3JjLmh0bWxcbiAqXG4gKiBUaGUgYXJndW1lbnQgcGFzc2VkIHRvIHRoaXMgZnVuY3Rpb24gaXMgdGhlIGtleSByZXR1cm5lZCBmcm9tXG4gKiB7QGxpbmsgbW9kdWxlOm9sL2V2ZW50c35saXN0ZW59IG9yIHtAbGluayBtb2R1bGU6b2wvZXZlbnRzfmxpc3Rlbk9uY2V9LlxuICpcbiAqIEBwYXJhbSB7RXZlbnRzS2V5fSBrZXkgVGhlIGtleS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVubGlzdGVuQnlLZXkoa2V5KSB7XG4gICAgaWYgKGtleSAmJiBrZXkudGFyZ2V0KSB7XG4gICAgICAgIGtleS50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihrZXkudHlwZSwga2V5Lmxpc3RlbmVyKTtcbiAgICAgICAgY2xlYXIoa2V5KTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ldmVudHMuanMubWFwIiwiLyoqXG4gKiBAbW9kdWxlIG9sL2V2ZW50cy9FdmVudFxuICovXG4vKipcbiAqIEBjbGFzc2Rlc2NcbiAqIFN0cmlwcGVkIGRvd24gaW1wbGVtZW50YXRpb24gb2YgdGhlIFczQyBET00gTGV2ZWwgMiBFdmVudCBpbnRlcmZhY2UuXG4gKiBTZWUgaHR0cHM6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0yLUV2ZW50cy9ldmVudHMuaHRtbCNFdmVudHMtaW50ZXJmYWNlLlxuICpcbiAqIFRoaXMgaW1wbGVtZW50YXRpb24gb25seSBwcm92aWRlcyBgdHlwZWAgYW5kIGB0YXJnZXRgIHByb3BlcnRpZXMsIGFuZFxuICogYHN0b3BQcm9wYWdhdGlvbmAgYW5kIGBwcmV2ZW50RGVmYXVsdGAgbWV0aG9kcy4gSXQgaXMgbWVhbnQgYXMgYmFzZSBjbGFzc1xuICogZm9yIGhpZ2hlciBsZXZlbCBldmVudHMgZGVmaW5lZCBpbiB0aGUgbGlicmFyeSwgYW5kIHdvcmtzIHdpdGhcbiAqIHtAbGluayBtb2R1bGU6b2wvZXZlbnRzL1RhcmdldH5UYXJnZXR9LlxuICovXG52YXIgQmFzZUV2ZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFR5cGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gQmFzZUV2ZW50KHR5cGUpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wcm9wYWdhdGlvblN0b3BwZWQ7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZXZlbnQgdHlwZS5cbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQGFwaVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBldmVudCB0YXJnZXQuXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAqIEBhcGlcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RvcCBldmVudCBwcm9wYWdhdGlvbi5cbiAgICAgKiBAYXBpXG4gICAgICovXG4gICAgQmFzZUV2ZW50LnByb3RvdHlwZS5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU3RvcCBldmVudCBwcm9wYWdhdGlvbi5cbiAgICAgKiBAYXBpXG4gICAgICovXG4gICAgQmFzZUV2ZW50LnByb3RvdHlwZS5zdG9wUHJvcGFnYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcbiAgICB9O1xuICAgIHJldHVybiBCYXNlRXZlbnQ7XG59KCkpO1xuLyoqXG4gKiBAcGFyYW0ge0V2ZW50fGltcG9ydChcIi4vRXZlbnQuanNcIikuZGVmYXVsdH0gZXZ0IEV2ZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdG9wUHJvcGFnYXRpb24oZXZ0KSB7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xufVxuLyoqXG4gKiBAcGFyYW0ge0V2ZW50fGltcG9ydChcIi4vRXZlbnQuanNcIikuZGVmYXVsdH0gZXZ0IEV2ZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmV2ZW50RGVmYXVsdChldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbn1cbmV4cG9ydCBkZWZhdWx0IEJhc2VFdmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUV2ZW50LmpzLm1hcCIsIi8qKlxuICogQG1vZHVsZSBvbC9ldmVudHMvRXZlbnRUeXBlXG4gKi9cbi8qKlxuICogQGVudW0ge3N0cmluZ31cbiAqIEBjb25zdFxuICovXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgLyoqXG4gICAgICogR2VuZXJpYyBjaGFuZ2UgZXZlbnQuIFRyaWdnZXJlZCB3aGVuIHRoZSByZXZpc2lvbiBjb3VudGVyIGlzIGluY3JlYXNlZC5cbiAgICAgKiBAZXZlbnQgbW9kdWxlOm9sL2V2ZW50cy9FdmVudH5CYXNlRXZlbnQjY2hhbmdlXG4gICAgICogQGFwaVxuICAgICAqL1xuICAgIENIQU5HRTogJ2NoYW5nZScsXG4gICAgLyoqXG4gICAgICogR2VuZXJpYyBlcnJvciBldmVudC4gVHJpZ2dlcmVkIHdoZW4gYW4gZXJyb3Igb2NjdXJzLlxuICAgICAqIEBldmVudCBtb2R1bGU6b2wvZXZlbnRzL0V2ZW50fkJhc2VFdmVudCNlcnJvclxuICAgICAqIEBhcGlcbiAgICAgKi9cbiAgICBFUlJPUjogJ2Vycm9yJyxcbiAgICBCTFVSOiAnYmx1cicsXG4gICAgQ0xFQVI6ICdjbGVhcicsXG4gICAgQ09OVEVYVE1FTlU6ICdjb250ZXh0bWVudScsXG4gICAgQ0xJQ0s6ICdjbGljaycsXG4gICAgREJMQ0xJQ0s6ICdkYmxjbGljaycsXG4gICAgRFJBR0VOVEVSOiAnZHJhZ2VudGVyJyxcbiAgICBEUkFHT1ZFUjogJ2RyYWdvdmVyJyxcbiAgICBEUk9QOiAnZHJvcCcsXG4gICAgRk9DVVM6ICdmb2N1cycsXG4gICAgS0VZRE9XTjogJ2tleWRvd24nLFxuICAgIEtFWVBSRVNTOiAna2V5cHJlc3MnLFxuICAgIExPQUQ6ICdsb2FkJyxcbiAgICBSRVNJWkU6ICdyZXNpemUnLFxuICAgIFRPVUNITU9WRTogJ3RvdWNobW92ZScsXG4gICAgV0hFRUw6ICd3aGVlbCcsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RXZlbnRUeXBlLmpzLm1hcCIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuLyoqXG4gKiBAbW9kdWxlIG9sL2V2ZW50cy9UYXJnZXRcbiAqL1xuaW1wb3J0IERpc3Bvc2FibGUgZnJvbSAnLi4vRGlzcG9zYWJsZS5qcyc7XG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9FdmVudC5qcyc7XG5pbXBvcnQgeyBWT0lEIH0gZnJvbSAnLi4vZnVuY3Rpb25zLmpzJztcbmltcG9ydCB7IGNsZWFyIH0gZnJvbSAnLi4vb2JqLmpzJztcbi8qKlxuICogQHR5cGVkZWYge0V2ZW50VGFyZ2V0fFRhcmdldH0gRXZlbnRUYXJnZXRMaWtlXG4gKi9cbi8qKlxuICogQGNsYXNzZGVzY1xuICogQSBzaW1wbGlmaWVkIGltcGxlbWVudGF0aW9uIG9mIHRoZSBXM0MgRE9NIExldmVsIDIgRXZlbnRUYXJnZXQgaW50ZXJmYWNlLlxuICogU2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi8yMDAwL1JFQy1ET00tTGV2ZWwtMi1FdmVudHMtMjAwMDExMTMvZXZlbnRzLmh0bWwjRXZlbnRzLUV2ZW50VGFyZ2V0LlxuICpcbiAqIFRoZXJlIGFyZSB0d28gaW1wb3J0YW50IHNpbXBsaWZpY2F0aW9ucyBjb21wYXJlZCB0byB0aGUgc3BlY2lmaWNhdGlvbjpcbiAqXG4gKiAxLiBUaGUgaGFuZGxpbmcgb2YgYHVzZUNhcHR1cmVgIGluIGBhZGRFdmVudExpc3RlbmVyYCBhbmRcbiAqICAgIGByZW1vdmVFdmVudExpc3RlbmVyYC4gVGhlcmUgaXMgbm8gcmVhbCBjYXB0dXJlIG1vZGVsLlxuICogMi4gVGhlIGhhbmRsaW5nIG9mIGBzdG9wUHJvcGFnYXRpb25gIGFuZCBgcHJldmVudERlZmF1bHRgIG9uIGBkaXNwYXRjaEV2ZW50YC5cbiAqICAgIFRoZXJlIGlzIG5vIGV2ZW50IHRhcmdldCBoaWVyYXJjaHkuIFdoZW4gYSBsaXN0ZW5lciBjYWxsc1xuICogICAgYHN0b3BQcm9wYWdhdGlvbmAgb3IgYHByZXZlbnREZWZhdWx0YCBvbiBhbiBldmVudCBvYmplY3QsIGl0IG1lYW5zIHRoYXQgbm9cbiAqICAgIG1vcmUgbGlzdGVuZXJzIGFmdGVyIHRoaXMgb25lIHdpbGwgYmUgY2FsbGVkLiBTYW1lIGFzIHdoZW4gdGhlIGxpc3RlbmVyXG4gKiAgICByZXR1cm5zIGZhbHNlLlxuICovXG52YXIgVGFyZ2V0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhUYXJnZXQsIF9zdXBlcik7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHsqPX0gb3B0X3RhcmdldCBEZWZhdWx0IGV2ZW50IHRhcmdldCBmb3IgZGlzcGF0Y2hlZCBldmVudHMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gVGFyZ2V0KG9wdF90YXJnZXQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEB0eXBlIHsqfVxuICAgICAgICAgKi9cbiAgICAgICAgX3RoaXMuZXZlbnRUYXJnZXRfID0gb3B0X3RhcmdldDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBudW1iZXI+fVxuICAgICAgICAgKi9cbiAgICAgICAgX3RoaXMucGVuZGluZ1JlbW92YWxzXyA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgbnVtYmVyPn1cbiAgICAgICAgICovXG4gICAgICAgIF90aGlzLmRpc3BhdGNoaW5nXyA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgQXJyYXk8aW1wb3J0KFwiLi4vZXZlbnRzLmpzXCIpLkxpc3RlbmVyPj59XG4gICAgICAgICAqL1xuICAgICAgICBfdGhpcy5saXN0ZW5lcnNfID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUeXBlLlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vZXZlbnRzLmpzXCIpLkxpc3RlbmVyfSBsaXN0ZW5lciBMaXN0ZW5lci5cbiAgICAgKi9cbiAgICBUYXJnZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKCF0eXBlIHx8ICFsaXN0ZW5lcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc18gfHwgKHRoaXMubGlzdGVuZXJzXyA9IHt9KTtcbiAgICAgICAgdmFyIGxpc3RlbmVyc0ZvclR5cGUgPSBsaXN0ZW5lcnNbdHlwZV0gfHwgKGxpc3RlbmVyc1t0eXBlXSA9IFtdKTtcbiAgICAgICAgaWYgKGxpc3RlbmVyc0ZvclR5cGUuaW5kZXhPZihsaXN0ZW5lcikgPT09IC0xKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnNGb3JUeXBlLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEaXNwYXRjaGVzIGFuIGV2ZW50IGFuZCBjYWxscyBhbGwgbGlzdGVuZXJzIGxpc3RlbmluZyBmb3IgZXZlbnRzXG4gICAgICogb2YgdGhpcyB0eXBlLiBUaGUgZXZlbnQgcGFyYW1ldGVyIGNhbiBlaXRoZXIgYmUgYSBzdHJpbmcgb3IgYW5cbiAgICAgKiBPYmplY3Qgd2l0aCBhIGB0eXBlYCBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi9FdmVudC5qc1wiKS5kZWZhdWx0fHN0cmluZ30gZXZlbnQgRXZlbnQgb2JqZWN0LlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW58dW5kZWZpbmVkfSBgZmFsc2VgIGlmIGFueW9uZSBjYWxsZWQgcHJldmVudERlZmF1bHQgb24gdGhlXG4gICAgICogICAgIGV2ZW50IG9iamVjdCBvciBpZiBhbnkgb2YgdGhlIGxpc3RlbmVycyByZXR1cm5lZCBmYWxzZS5cbiAgICAgKiBAYXBpXG4gICAgICovXG4gICAgVGFyZ2V0LnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIC8qKiBAdHlwZSB7aW1wb3J0KFwiLi9FdmVudC5qc1wiKS5kZWZhdWx0fEV2ZW50fSAqL1xuICAgICAgICB2YXIgZXZ0ID0gdHlwZW9mIGV2ZW50ID09PSAnc3RyaW5nJyA/IG5ldyBFdmVudChldmVudCkgOiBldmVudDtcbiAgICAgICAgdmFyIHR5cGUgPSBldnQudHlwZTtcbiAgICAgICAgaWYgKCFldnQudGFyZ2V0KSB7XG4gICAgICAgICAgICBldnQudGFyZ2V0ID0gdGhpcy5ldmVudFRhcmdldF8gfHwgdGhpcztcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNfICYmIHRoaXMubGlzdGVuZXJzX1t0eXBlXTtcbiAgICAgICAgdmFyIHByb3BhZ2F0ZTtcbiAgICAgICAgaWYgKGxpc3RlbmVycykge1xuICAgICAgICAgICAgdmFyIGRpc3BhdGNoaW5nID0gdGhpcy5kaXNwYXRjaGluZ18gfHwgKHRoaXMuZGlzcGF0Y2hpbmdfID0ge30pO1xuICAgICAgICAgICAgdmFyIHBlbmRpbmdSZW1vdmFscyA9IHRoaXMucGVuZGluZ1JlbW92YWxzXyB8fCAodGhpcy5wZW5kaW5nUmVtb3ZhbHNfID0ge30pO1xuICAgICAgICAgICAgaWYgKCEodHlwZSBpbiBkaXNwYXRjaGluZykpIHtcbiAgICAgICAgICAgICAgICBkaXNwYXRjaGluZ1t0eXBlXSA9IDA7XG4gICAgICAgICAgICAgICAgcGVuZGluZ1JlbW92YWxzW3R5cGVdID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICsrZGlzcGF0Y2hpbmdbdHlwZV07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgaWkgPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgaWk7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmICgnaGFuZGxlRXZlbnQnIGluIGxpc3RlbmVyc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICBwcm9wYWdhdGUgPSAvKiogQHR5cGUge2ltcG9ydChcIi4uL2V2ZW50cy5qc1wiKS5MaXN0ZW5lck9iamVjdH0gKi8gKGxpc3RlbmVyc1tpXSkuaGFuZGxlRXZlbnQoZXZ0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BhZ2F0ZSA9IC8qKiBAdHlwZSB7aW1wb3J0KFwiLi4vZXZlbnRzLmpzXCIpLkxpc3RlbmVyRnVuY3Rpb259ICovIChsaXN0ZW5lcnNbaV0pLmNhbGwodGhpcywgZXZ0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHByb3BhZ2F0ZSA9PT0gZmFsc2UgfHwgZXZ0LnByb3BhZ2F0aW9uU3RvcHBlZCkge1xuICAgICAgICAgICAgICAgICAgICBwcm9wYWdhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLS1kaXNwYXRjaGluZ1t0eXBlXTtcbiAgICAgICAgICAgIGlmIChkaXNwYXRjaGluZ1t0eXBlXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciBwciA9IHBlbmRpbmdSZW1vdmFsc1t0eXBlXTtcbiAgICAgICAgICAgICAgICBkZWxldGUgcGVuZGluZ1JlbW92YWxzW3R5cGVdO1xuICAgICAgICAgICAgICAgIHdoaWxlIChwci0tKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBWT0lEKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVsZXRlIGRpc3BhdGNoaW5nW3R5cGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByb3BhZ2F0ZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2xlYW4gdXAuXG4gICAgICovXG4gICAgVGFyZ2V0LnByb3RvdHlwZS5kaXNwb3NlSW50ZXJuYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzXyAmJiBjbGVhcih0aGlzLmxpc3RlbmVyc18pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBsaXN0ZW5lcnMgZm9yIGEgc3BlY2lmaWVkIGV2ZW50IHR5cGUuIExpc3RlbmVycyBhcmUgcmV0dXJuZWQgaW4gdGhlXG4gICAgICogb3JkZXIgdGhhdCB0aGV5IHdpbGwgYmUgY2FsbGVkIGluLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVHlwZS5cbiAgICAgKiBAcmV0dXJuIHtBcnJheTxpbXBvcnQoXCIuLi9ldmVudHMuanNcIikuTGlzdGVuZXI+fHVuZGVmaW5lZH0gTGlzdGVuZXJzLlxuICAgICAqL1xuICAgIFRhcmdldC5wcm90b3R5cGUuZ2V0TGlzdGVuZXJzID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmxpc3RlbmVyc18gJiYgdGhpcy5saXN0ZW5lcnNfW3R5cGVdKSB8fCB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZz19IG9wdF90eXBlIFR5cGUuIElmIG5vdCBwcm92aWRlZCxcbiAgICAgKiAgICAgYHRydWVgIHdpbGwgYmUgcmV0dXJuZWQgaWYgdGhpcyBldmVudCB0YXJnZXQgaGFzIGFueSBsaXN0ZW5lcnMuXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gSGFzIGxpc3RlbmVycy5cbiAgICAgKi9cbiAgICBUYXJnZXQucHJvdG90eXBlLmhhc0xpc3RlbmVyID0gZnVuY3Rpb24gKG9wdF90eXBlKSB7XG4gICAgICAgIGlmICghdGhpcy5saXN0ZW5lcnNfKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wdF90eXBlXG4gICAgICAgICAgICA/IG9wdF90eXBlIGluIHRoaXMubGlzdGVuZXJzX1xuICAgICAgICAgICAgOiBPYmplY3Qua2V5cyh0aGlzLmxpc3RlbmVyc18pLmxlbmd0aCA+IDA7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUeXBlLlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vZXZlbnRzLmpzXCIpLkxpc3RlbmVyfSBsaXN0ZW5lciBMaXN0ZW5lci5cbiAgICAgKi9cbiAgICBUYXJnZXQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzXyAmJiB0aGlzLmxpc3RlbmVyc19bdHlwZV07XG4gICAgICAgIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wZW5kaW5nUmVtb3ZhbHNfICYmIHR5cGUgaW4gdGhpcy5wZW5kaW5nUmVtb3ZhbHNfKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2UgbGlzdGVuZXIgYSBuby1vcCwgYW5kIHJlbW92ZSBsYXRlciBpbiAjZGlzcGF0Y2hFdmVudCgpXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyc1tpbmRleF0gPSBWT0lEO1xuICAgICAgICAgICAgICAgICAgICArK3RoaXMucGVuZGluZ1JlbW92YWxzX1t0eXBlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMubGlzdGVuZXJzX1t0eXBlXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFRhcmdldDtcbn0oRGlzcG9zYWJsZSkpO1xuZXhwb3J0IGRlZmF1bHQgVGFyZ2V0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VGFyZ2V0LmpzLm1hcCIsIi8qKlxuICogQG1vZHVsZSBvbC9mdW5jdGlvbnNcbiAqL1xuaW1wb3J0IHsgZXF1YWxzIGFzIGFycmF5RXF1YWxzIH0gZnJvbSAnLi9hcnJheS5qcyc7XG4vKipcbiAqIEFsd2F5cyByZXR1cm5zIHRydWUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFRSVUUoKSB7XG4gICAgcmV0dXJuIHRydWU7XG59XG4vKipcbiAqIEFsd2F5cyByZXR1cm5zIGZhbHNlLlxuICogQHJldHVybnMge2Jvb2xlYW59IGZhbHNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gRkFMU0UoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuLyoqXG4gKiBBIHJldXNhYmxlIGZ1bmN0aW9uLCB1c2VkIGUuZy4gYXMgYSBkZWZhdWx0IGZvciBjYWxsYmFja3MuXG4gKlxuICogQHJldHVybiB7dm9pZH0gTm90aGluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFZPSUQoKSB7IH1cbi8qKlxuICogV3JhcCBhIGZ1bmN0aW9uIGluIGFub3RoZXIgZnVuY3Rpb24gdGhhdCByZW1lbWJlcnMgdGhlIGxhc3QgcmV0dXJuLiAgSWYgdGhlXG4gKiByZXR1cm5lZCBmdW5jdGlvbiBpcyBjYWxsZWQgdHdpY2UgaW4gYSByb3cgd2l0aCB0aGUgc2FtZSBhcmd1bWVudHMgYW5kIHRoZSBzYW1lXG4gKiB0aGlzIG9iamVjdCwgaXQgd2lsbCByZXR1cm4gdGhlIHZhbHVlIGZyb20gdGhlIGZpcnN0IGNhbGwgaW4gdGhlIHNlY29uZCBjYWxsLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24oLi4uYW55KTogUmV0dXJuVHlwZX0gZm4gVGhlIGZ1bmN0aW9uIHRvIG1lbW9pemUuXG4gKiBAcmV0dXJuIHtmdW5jdGlvbiguLi5hbnkpOiBSZXR1cm5UeXBlfSBUaGUgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gKiBAdGVtcGxhdGUgUmV0dXJuVHlwZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVtb2l6ZU9uZShmbikge1xuICAgIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgICAvKiogQHR5cGUge1JldHVyblR5cGV9ICovXG4gICAgdmFyIGxhc3RSZXN1bHQ7XG4gICAgLyoqIEB0eXBlIHtBcnJheTxhbnk+fSAqL1xuICAgIHZhciBsYXN0QXJncztcbiAgICB2YXIgbGFzdFRoaXM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5leHRBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgaWYgKCFjYWxsZWQgfHwgdGhpcyAhPT0gbGFzdFRoaXMgfHwgIWFycmF5RXF1YWxzKG5leHRBcmdzLCBsYXN0QXJncykpIHtcbiAgICAgICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgICBsYXN0VGhpcyA9IHRoaXM7XG4gICAgICAgICAgICBsYXN0QXJncyA9IG5leHRBcmdzO1xuICAgICAgICAgICAgbGFzdFJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxhc3RSZXN1bHQ7XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZ1bmN0aW9ucy5qcy5tYXAiLCIvKipcbiAqIEBtb2R1bGUgb2wvb2JqXG4gKi9cbi8qKlxuICogUG9seWZpbGwgZm9yIE9iamVjdC5hc3NpZ24oKS4gIEFzc2lnbnMgZW51bWVyYWJsZSBhbmQgb3duIHByb3BlcnRpZXMgZnJvbVxuICogb25lIG9yIG1vcmUgc291cmNlIG9iamVjdHMgdG8gYSB0YXJnZXQgb2JqZWN0LlxuICogU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ24uXG4gKlxuICogQHBhcmFtIHshT2JqZWN0fSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gdmFyX3NvdXJjZXMgVGhlIHNvdXJjZSBvYmplY3QocykuXG4gKiBAcmV0dXJuIHshT2JqZWN0fSBUaGUgbW9kaWZpZWQgdGFyZ2V0IG9iamVjdC5cbiAqL1xuZXhwb3J0IHZhciBhc3NpZ24gPSB0eXBlb2YgT2JqZWN0LmFzc2lnbiA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gT2JqZWN0LmFzc2lnblxuICAgIDogZnVuY3Rpb24gKHRhcmdldCwgdmFyX3NvdXJjZXMpIHtcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG91dHB1dCA9IE9iamVjdCh0YXJnZXQpO1xuICAgICAgICBmb3IgKHZhciBpID0gMSwgaWkgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWk7ICsraSkge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGlmIChzb3VyY2UgIT09IHVuZGVmaW5lZCAmJiBzb3VyY2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH07XG4vKipcbiAqIFJlbW92ZXMgYWxsIHByb3BlcnRpZXMgZnJvbSBhbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY2xlYXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhcihvYmplY3QpIHtcbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBvYmplY3QpIHtcbiAgICAgICAgZGVsZXRlIG9iamVjdFtwcm9wZXJ0eV07XG4gICAgfVxufVxuLyoqXG4gKiBQb2x5ZmlsbCBmb3IgT2JqZWN0LnZhbHVlcygpLiAgR2V0IGFuIGFycmF5IG9mIHByb3BlcnR5IHZhbHVlcyBmcm9tIGFuIG9iamVjdC5cbiAqIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvdmFsdWVzXG4gKlxuICogQHBhcmFtIHshT2JqZWN0PEssVj59IG9iamVjdCBUaGUgb2JqZWN0IGZyb20gd2hpY2ggdG8gZ2V0IHRoZSB2YWx1ZXMuXG4gKiBAcmV0dXJuIHshQXJyYXk8Vj59IFRoZSBwcm9wZXJ0eSB2YWx1ZXMuXG4gKiBAdGVtcGxhdGUgSyxWXG4gKi9cbmV4cG9ydCB2YXIgZ2V0VmFsdWVzID0gdHlwZW9mIE9iamVjdC52YWx1ZXMgPT09ICdmdW5jdGlvbidcbiAgICA/IE9iamVjdC52YWx1ZXNcbiAgICA6IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgIHZhbHVlcy5wdXNoKG9iamVjdFtwcm9wZXJ0eV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfTtcbi8qKlxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBoYXMgYW55IHByb3BlcnRpZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY2hlY2suXG4gKiBAcmV0dXJuIHtib29sZWFufSBUaGUgb2JqZWN0IGlzIGVtcHR5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eShvYmplY3QpIHtcbiAgICB2YXIgcHJvcGVydHk7XG4gICAgZm9yIChwcm9wZXJ0eSBpbiBvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gIXByb3BlcnR5O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JqLmpzLm1hcCIsIi8qKlxuICogQG1vZHVsZSBvbC91dGlsXG4gKi9cbi8qKlxuICogQHJldHVybiB7P30gQW55IHJldHVybi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFic3RyYWN0KCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgez99ICovICgoZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuaW1wbGVtZW50ZWQgYWJzdHJhY3QgbWV0aG9kLicpO1xuICAgIH0pKCkpO1xufVxuLyoqXG4gKiBDb3VudGVyIGZvciBnZXRVaWQuXG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQHByaXZhdGVcbiAqL1xudmFyIHVpZENvdW50ZXJfID0gMDtcbi8qKlxuICogR2V0cyBhIHVuaXF1ZSBJRCBmb3IgYW4gb2JqZWN0LiBUaGlzIG11dGF0ZXMgdGhlIG9iamVjdCBzbyB0aGF0IGZ1cnRoZXIgY2FsbHNcbiAqIHdpdGggdGhlIHNhbWUgb2JqZWN0IGFzIGEgcGFyYW1ldGVyIHJldHVybnMgdGhlIHNhbWUgdmFsdWUuIFVuaXF1ZSBJRHMgYXJlIGdlbmVyYXRlZFxuICogYXMgYSBzdHJpY3RseSBpbmNyZWFzaW5nIHNlcXVlbmNlLiBBZGFwdGVkIGZyb20gZ29vZy5nZXRVaWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGdldCB0aGUgdW5pcXVlIElEIGZvci5cbiAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHVuaXF1ZSBJRCBmb3IgdGhlIG9iamVjdC5cbiAqIEBhcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFVpZChvYmopIHtcbiAgICByZXR1cm4gb2JqLm9sX3VpZCB8fCAob2JqLm9sX3VpZCA9IFN0cmluZygrK3VpZENvdW50ZXJfKSk7XG59XG4vKipcbiAqIE9wZW5MYXllcnMgdmVyc2lvbi5cbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCB2YXIgVkVSU0lPTiA9ICc2LjQuMyc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlsLmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=