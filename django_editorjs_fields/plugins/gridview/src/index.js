/**
 * Build styles
 */
require('./index.css').toString();

/**
 * Gridview Tool for the Editor.js
 *
 * Allows to wrap inline fragment and style it somehow.
 */
class Gridview {
    /**
     * Class name for term-tag
     *
     * @type {string}
     */
    static get CSS() {
        return 'gridview';
    };

    static get toolbox() {
        return {
            title: 'Gridview',
            icon: require('./../assets/icon.svg').default
        };
    }
    
    /**
     */
    constructor({api}) {
        this.api = api;

        /**
         * Tag represented the term
         *
         * @type {string}
         */
        this.tag = 'GRID';

        /**
         * CSS classes
         */
        this.iconClasses = {
            base: this.api.styles.inlineToolButton,
            active: this.api.styles.inlineToolButtonActive
        };
    }

    render() {
        return document.createElement('input');
    }

    save(blockContent) {
        return {
            url: blockContent.value
        }
    }
}

module.exports = Gridview;
