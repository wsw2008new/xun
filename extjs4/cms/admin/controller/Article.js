/*
 * File: admin/controller/Article.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('CMS.controller.Article', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'articleManagePanel',
            selector: 'articleManagePanel',
            xtype: 'panel'
        },
        {
            ref: 'articleAddWindow',
            selector: 'articleAddWindow',
            xtype: 'Ext.window.Window'
        }
    ],

    onRefreshChannelTreeClick: function(tool, e, eOpts) {
        //重新加载栏目树
        this.getArticleManagePanel().getComponent('channelTreePanel').store.load();
    },

    addArticle: function(panel) {
        var _window = this.getArticleAddWindow();
        if(null == _window){
            _window = Ext.create('CMS.view.ArticleAddWindow');
        }
        var _form = _window.getComponent('articleAddForm').getForm();
        _form.reset();
        _window.__gridPanel = panel;
        _window.show();
        _form.findField('title').focus(false, true);
    },

    editArticle: function(id, title) {
        this.getArticleManagePanel().getComponent('articleTabPanel').addOrShowTab('edit', id, title);
    },

    init: function(application) {
        this.control({
            "tool[itemId=refreshChannelTree]": {
                click: this.onRefreshChannelTreeClick
            }
        });
    }

});
