"""add pickup station user

Revision ID: 04d1d66e8d17
Revises: cd6e07ce3d50
Create Date: 2024-08-22 11:44:46.411299

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '04d1d66e8d17'
down_revision = 'cd6e07ce3d50'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_open', sa.Boolean(), nullable=True))
        batch_op.execute("UPDATE users SET is_open = True")
        batch_op.alter_column('is_open', nullable=False)
        batch_op.alter_column('user_role',
               existing_type=sa.VARCHAR(length=8),
               type_=sa.Enum('Business', 'Agent', 'Admin', 'PickupStation', name='user_roles'),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('user_role',
               existing_type=sa.Enum('Business', 'Agent', 'Admin', 'PickupStation', name='user_roles'),
               type_=sa.VARCHAR(length=8),
               existing_nullable=False)
        batch_op.drop_column('is_open')

    # ### end Alembic commands ###