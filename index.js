import * as maptalks from 'maptalks';

let parseQueryString = function (option) {
    var queryString = '/query?';
    var geometry = option.geometry || '';
    var condition = {
        where: option.where || '1=1',
        geometry: (geometry instanceof Object) ? JSON.stringify(geometry) : geometry,
        geometryType: option.geometryType || 'esriGeometryPoint',
        inSR: option.inSR || '',
        spatialRel: option.esriSpatialRelIntersects || 'esriSpatialRelIntersects',
        relationParam: option.relationParam || '',
        objectIds: option.objectIds || '',
        time: option.time || '',
        returnCountOnly: option.returnCountOnly || false,
        returnGeometry: option.returnGeometry || true,
        maxAllowableOffset: option.maxAllowableOffset||'',
        outSR: option.outSR || '',
        text:option.text||'',
        outFields: option.outFields || '*'
    };
    QueryTask.condition = condition;
    for (var p in condition) {
        queryString +="&"+p + "=" + condition[p];
    }
    queryString += "&f=pjson";
    return queryString;
}

export class QueryTask extends maptalks.Class {
    constructor(serverUrl, option) {
        super();
        this.serverUrl = serverUrl || "";
        this.option = option || {};
        this.excute = function (callback) {
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
        }
    }
}


