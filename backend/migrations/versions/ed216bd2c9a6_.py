"""empty message

Revision ID: ed216bd2c9a6
Revises: acd6b7fb6e5d
Create Date: 2021-12-11 15:00:15.861963

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ed216bd2c9a6'
down_revision = 'acd6b7fb6e5d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('comment', sa.Column('user_id', sa.Integer(), nullable=True))
    op.add_column('comment', sa.Column('is_approved', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('comment', 'is_approved')
    op.drop_column('comment', 'user_id')
    # ### end Alembic commands ###