/* jshint -W097 */
'use strict';

var flickrStorage = (function() {
    return {
        init: function(storageName) {
            if (!localStorage[storageName]) {
                localStorage[storageName] = '[]';
            }
        },

        getStorage: function(storageName) {
            return JSON.parse(localStorage[storageName]);
        },
        setStorageItem: function(storageName, item) {
            var myStore = JSON.parse(localStorage[storageName]);

            if (myStore.indexOf(item) == -1) {
                myStore.push(item);
                localStorage[storageName] = JSON.stringify(myStore);
            }
        },
        unsetStorageItem: function(storageName, item) {
            var myStore = JSON.parse(localStorage[storageName]);

            if (myStore.indexOf(item) > -1) {
                myStore.splice(myStore.indexOf(item), 1);
                localStorage[storageName] = JSON.stringify(myStore);
            }
        }
    };
})();

flickrStorage.init('sb_selected');