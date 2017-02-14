/*!
 * maptalks.arcgisquery v2.0.0
 * LICENSE : MIT
 * (c) 2016-2017 maptalks.org
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('maptalks')) :
	typeof define === 'function' && define.amd ? define(['exports', 'maptalks'], factory) :
	(factory((global.maptalks = global.maptalks || {}),global.maptalks));
}(this, (function (exports,maptalks) { 'use strict';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var parseQueryString = function parseQueryString(option) {
    var queryString = '/query?';
    var geometry = option.geometry || '';
    var condition = {
        where: option.where || '1=1',
        geometry: geometry instanceof Object ? JSON.stringify(geometry) : geometry,
        geometryType: option.geometryType || 'esriGeometryPoint',
        inSR: option.inSR || '',
        spatialRel: option.esriSpatialRelIntersects || 'esriSpatialRelIntersects',
        relationParam: option.relationParam || '',
        objectIds: option.objectIds || '',
        time: option.time || '',
        returnCountOnly: option.returnCountOnly || false,
        returnGeometry: option.returnGeometry || true,
        maxAllowableOffset: option.maxAllowableOffset || '',
        outSR: option.outSR || '',
        text: option.text || '',
        outFields: option.outFields || '*'
    };
    QueryTask.condition = condition;
    for (var p in condition) {
        queryString += "&" + p + "=" + condition[p];
    }
    queryString += "&f=pjson";
    return queryString;
};

var QueryTask = function (_maptalks$Class) {
    _inherits(QueryTask, _maptalks$Class);

    function QueryTask(serverUrl, option) {
        _classCallCheck(this, QueryTask);

        var _this = _possibleConstructorReturn(this, _maptalks$Class.call(this));

        _this.serverUrl = serverUrl || "";
        _this.option = option || {};
        _this.excute = function (callback) {
            var _url = this.serverUrl;
            var proxyUrl = "../proxy/proxy.ashx";
            var requestUrl = proxyUrl;
            var filter = parseQueryString(this.option);
            maptalks.Ajax.post({
                url: requestUrl
            }, 'url=' + encodeURIComponent(_url) + '&filter=' + encodeURIComponent(filter), function (err, res) {
                if (err) return;
                var _result = maptalks.Util.parseJSON(res);
                callback(_result);
            });
        };
        return _this;
    }

    return QueryTask;
}(maptalks.Class);

exports.QueryTask = QueryTask;

Object.defineProperty(exports, '__esModule', { value: true });

})));
