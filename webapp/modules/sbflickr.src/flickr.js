/* jshint -W097 */
'use strict';

var flickr = (function() {
    var response = response,
        gridName = '' || gridName;

    var _ = window.flickrStorage;

    return {
        init: function(gridId) {
            this.createGridWrapper(gridId);
            this.attachEvents(gridId);
        },
        /**
         * [callback function for flickr jsonp api response]
         */
        cb: function(data) {
            this.setResponseValue(data);

            if (this.response.stat && this.response.stat == 'fail') {
                this.createErrorMessage(this.response, document.getElementById(this.gridName));
            } else {
                var i = 0,
                    amountOfPhotos = data.items.length,
                    itemsList = document.getElementById(this.gridName),
                    isSelected;

                for (i; i < amountOfPhotos; i++) {
                    isSelected = this.isItemSelected(data.items[i].link);

                    this.appendItem(this.getElementTemplate(data.items[i], isSelected), itemsList);
                }
            }
        },
        isItemSelected: function(item) {
            var flickrLocalStorage = _.getStorage('sb_selected'),
                storageSize = flickrLocalStorage.length,
                i = 0,
                isSelected = '';

            for (i; i < storageSize; i++) {
                if (flickrLocalStorage[i] == item) {
                    isSelected = 'selected';
                }
            }

            return isSelected;
        },
        /**
         * [setGridName]  set grid name same as wrapperId
         * @param {[string]}
         */
        setGridName: function(wrapperId) {
            this.gridName = wrapperId;
        },
        /**
         * [setResponseValue] let's keep our response private
         * @param {[object]}
         */
        setResponseValue: function(rsp) {
            this.response = rsp;
        },

        /**
         * [getElementTemplate] basic templating method which creates html string populated with flickr item response object
         * @param  {[object]}
         * @return {[string]}
         */
        getElementTemplate: function(item, isSelected) {
            var htmlElement = '' +
                '<li class="box">' +
                '<div class="boxInner">' +
                '<img src="' + item.media.m + '" class="' + isSelected + '" data-author="' + item.author + '" data-link="' + item.link + '" alt="' + item.title + '">' +
                '<div class="added"></div>' +
                '<h4>' + item.author + '</h4>' +
                // '<p>' + item.description + '</p>' +
                '</div>' +
                '</li>';

            return htmlElement;
        },

        appendItem: function(item, target) {
            target.insertAdjacentHTML('beforeend', item);
        },

        createErrorMessage: function(error, target) {
            var errorDiv = '<div class="error"><span>' + error.code + '</span>' + error.message + '</div>';
            this.appendItem(errorDiv, target);
        },
        /**
         * [createGridWrapper] method for defying and creating grid list
         */
        createGridWrapper: function(wrapperId) {
            var wrap = document.createElement('ul');
            wrap.id = wrapperId;

            document.body.appendChild(wrap);

            this.setGridName(wrapperId);
        },

        attachEvents: function(gridName) {
            var that = this;

            document.getElementById(gridName).onclick = function(e) {
                e = e || event;
                var target = e.target || e.srcElement;

                if (target.nodeName == 'IMG' || target.nodeName == 'H4') {
                    that.toggleSelected(target);
                }

            };
        },

        toggleSelected: function(target) {
            var parentTarget = target.parentElement,
                selectedImage = parentTarget.getElementsByTagName('IMG')[0];

            if (selectedImage.classList.contains('selected')) {
                _.unsetStorageItem('sb_selected', selectedImage.dataset.link);
            } else {
                _.setStorageItem('sb_selected', selectedImage.dataset.link);
            }
            selectedImage.classList.toggle('selected');
        }
    };
})();

flickr.init('grid-list');