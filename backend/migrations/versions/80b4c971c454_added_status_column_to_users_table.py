"""added status column to users table

Revision ID: 80b4c971c454
Revises: accd91a45c4c
Create Date: 2024-08-05 15:46:33.598123

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '80b4c971c454'
down_revision = 'accd91a45c4c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('status', sa.Enum('Available', 'Unavailable', name='user_statuses'), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('status')

    # ### end Alembic commands ###