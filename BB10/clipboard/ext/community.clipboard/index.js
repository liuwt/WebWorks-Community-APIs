/*
 * Copyright 2012 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = {
    getTextServer: function (success, fail, args, env) {
        try {
            success(jsclipboard.getTextJNext());
        } catch (e) {
            fail(-1, e);
        }
    },

    setTextServer: function (success, fail, args, env) {
        try {
	        var _text=JSON.parse(decodeURIComponent(args.str));
            success(jsclipboard.setTextJNext(_text));
        } catch (e) {
            fail(-1, e);
        }
    }
};

///////////////////////////////////////////////////////////////////
// JavaScript wrapper for JNEXT plugin
///////////////////////////////////////////////////////////////////

JNEXT.JsClipboard = function ()
{   
    var _self = this;

    _self.getTextJNext = function () {
        return JNEXT.invoke(_self._id, "getText");
    };

    _self.setTextJNext = function (str) {
        return JNEXT.invoke(_self._id, "setText "+str);
    };

    _self.getId = function () {
        return _self._id;
    };

    _self.init = function () {
        if (!JNEXT.require("libclipboard")) {
            return false;
        }

        _self._id = JNEXT.createObject("libclipboard.JsClipboard");

        if (!_self._id || _self._id === "") {
            return false;
        }

        JNEXT.registerEvents(_self);
    };
    
    _self._id = "";
    
    _self.init();
};

jsclipboard = new JNEXT.JsClipboard();
