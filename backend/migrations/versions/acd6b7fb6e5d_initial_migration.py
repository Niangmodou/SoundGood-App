"""Initial migration.

Revision ID: acd6b7fb6e5d
Revises: 
Create Date: 2021-12-11 14:52:40.018326

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'acd6b7fb6e5d'
down_revision = None
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