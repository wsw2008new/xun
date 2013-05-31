/*
 * File: admin/view/ArticleEditPanel.js
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

Ext.define('CMS.view.ArticleEditPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.articleEditPanel',

    border: false,
    frame: true,
    bodyPadding: 5,
    closable: true,
    waitMsgTarget: true,

    initComponent: function() {
        var me = this;

        me.initialConfig = Ext.apply({
            waitMsgTarget: true
        }, me.initialConfig);

        Ext.applyIf(me, {
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 65
            },
            items: [
                {
                    xtype: 'fieldset',
                    defaults: {
                        columnWidth: 1,
                        padding: 2
                    },
                    layout: {
                        type: 'column'
                    },
                    title: '文章信息',
                    items: [
                        {
                            xtype: 'displayfield',
                            columnWidth: 0.5,
                            fieldLabel: '编号',
                            name: 'id'
                        },
                        {
                            xtype: 'displayfield',
                            columnWidth: 0.5,
                            fieldLabel: '所属栏目',
                            name: 'channelName'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '文章标题',
                            name: 'title',
                            allowBlank: false,
                            maxLength: 100
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '文章模板',
                            name: 'tpl',
                            maxLength: 50
                        },
                        {
                            xtype: 'displayfield',
                            columnWidth: 0.5,
                            fieldLabel: '上一篇',
                            name: 'prev'
                        },
                        {
                            xtype: 'displayfield',
                            columnWidth: 0.5,
                            fieldLabel: '下一篇',
                            name: 'next'
                        },
                        {
                            xtype: 'textfield',
                            columnWidth: 0.5,
                            fieldLabel: '权重',
                            name: 'weight'
                        },
                        {
                            xtype: 'textfield',
                            columnWidth: 0.5,
                            fieldLabel: '点击量',
                            name: 'visits'
                        },
                        {
                            xtype: 'displayfield',
                            columnWidth: 0.5,
                            fieldLabel: '创建时间',
                            name: 'date'
                        },
                        {
                            xtype: 'textfield',
                            columnWidth: 0.5,
                            fieldLabel: '关键字',
                            name: 'keywords'
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: '摘要',
                            name: 'excerpt',
                            maxLength: 250
                        },
                        {
                            xtype: 'label',
                            columnWidth: 0.5,
                            text: '内容'
                        },
                        {
                            xtype: 'htmleditor',
                            height: 150,
                            hideLabel: true,
                            name: 'content'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});