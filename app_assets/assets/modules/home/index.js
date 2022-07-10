import './styles.scss';

const homeModule = (function ($, window) {
    'use strict';

    const MODULE_NAME = 'MODULE-home';

    // TODO

    function init() {
        console.log(MODULE_NAME);
    }

    return {
        init,
    }
})(jQuery, window);

jQuery(function () {
    jQuery('body#MODULE-home').length && homeModule.init();
});