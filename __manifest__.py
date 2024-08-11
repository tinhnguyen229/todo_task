# -*- coding: utf-8 -*-
{
    'name': 'Todo Task Module',
    'description': "Todo Task Module using Owl Odoo v16.",
    'version': '1.0',
    'category': 'Tinhnn Module',
    'author': 'Tinhnn',
    'website': '',
    'depends': [
        'base',
    ],
    'data': [
        # Security
        'security/ir.model.access.csv',
        # View
        'views/todo_task_view.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'todo_task_module/static/src/components/*/*.js',
            'todo_task_module/static/src/components/*/*.xml',
        ],
    },
    'installable': True,
    'active': True,
    'license': 'LGPL-3',
}
