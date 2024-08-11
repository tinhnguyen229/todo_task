from odoo import models, fields, api


class TodoTask(models.Model):
    _name = 'todo.task'

    name = fields.Char()
    is_done = fields.Boolean()
    active = fields.Boolean(default=True)
    user_id = fields.Many2one('res.users')
    description = fields.Text()
    color = fields.Char()

    @api.model
    def test(self, *args, **kw):
        print(args)
        print(kw)
        return {
            'a': 'hello',
            'b': 'world',
        }