require('./index.css').toString();
const EditorJS = require('@editorjs/editorjs');
const { v4: uuidv4 } = require('uuid');

class Gridview {
    static get CSS() {
        return 'gridview';
    };

    static get toolbox() {
        return {
            title: 'Gridview',
            icon: require('./../assets/icon.svg').default
        };
    }
    
    constructor({api}) {
        this.api = api;

        this.gridHolder = document.createElement('div');
        this.gridHolder.classList.add('columns');

        this.settings = [
            {
                name: 'Two Columns',
                value: 2,
                icon: require('./../assets/two-columns.svg').default
            },
            {
                name: 'Three Columns',
                value: 3,
                icon: require('./../assets/three-columns.svg').default
            }
        ];

        this.iconClasses = {
            base: this.api.styles.inlineToolButton,
            active: this.api.styles.inlineToolButtonActive
        };
    }

    render() {
        this.gridHolder.appendChild(this.createColumn(uuidv4()));
        
        return this.gridHolder;
    }

    renderSettings() {
        const wrapper = document.createElement('div');
    
        this.settings.forEach( tune => {
            let button = document.createElement('div');
        
            button.classList.add('cdx-settings-button');
            button.innerHTML = tune.icon;
            wrapper.appendChild(button);

            button.addEventListener('click', () => {
                this._toggleTune(tune.value);
            });
        });
    
        return wrapper;
    }
    
    createColumn(id) {
        const column = document.createElement('div');
        column.classList.add('column');
        column.id = id;
        this.createColumnEditor(id);

        return column;
    }

    createColumnEditor(holderID, data = null) {
        let config = {};
        let text = null;
        const textarea = document.getElementById('id_body');
        
        if (textarea) {
            config = JSON.parse(textarea.getAttribute("data-config"));
            text = JSON.parse(text)
        }
        
        const editorConfig = {
            holder: holderID,
            data: text 
        }

        // Test code
        var tools = config.tools

        for (var plugin in tools) {
            var cls = tools[plugin].class
    
            if (cls && window[cls] != undefined) {
                tools[plugin].class = eval(cls)
                continue
            }
    
            delete tools[plugin]
            logError("[" + plugin + "] Class " + cls + " Not Found - TESTCODE")
        }

        editorConfig.tools = tools;

        console.log('editorConfig');
        console.log(editorConfig);

        return new EditorJS(editorConfig);
    }

    save(blockContent) {
        // console.log(blockContent.childNodes);
        // const columns = [];

        // blockContent.childNodes.forEach((column) => {

        // });

        return {
            columns: blockContent.innerHTML,
            level: 'test',
        };
    }

    _toggleTune(value) {
        this.gridHolder.innerHTML = '';
        this.gridHolder.style.cssText = `grid-template-columns: repeat(${value}, minmax(${100/value}%, 1fr));`;
        
        for (let i = 0; i < value; i++) {
            this.gridHolder.appendChild(this.createColumn(uuidv4()));
        }
    }
        
}

module.exports = Gridview;
