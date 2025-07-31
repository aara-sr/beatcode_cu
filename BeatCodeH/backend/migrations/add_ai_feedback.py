"""Add AI feedback and scores to matches table"""
from sqlalchemy import Column, Float, Text
from sqlalchemy.ext.declarative import declarative_base
from alembic import op

def upgrade():
    # Add new columns
    op.add_column('matches', Column('ai_score_p1', Float, nullable=True))
    op.add_column('matches', Column('ai_score_p2', Float, nullable=True))
    op.add_column('matches', Column('feedback_p1', Text, nullable=True))
    op.add_column('matches', Column('feedback_p2', Text, nullable=True))

def downgrade():
    # Drop columns if needed
    op.drop_column('matches', 'ai_score_p1')
    op.drop_column('matches', 'ai_score_p2')
    op.drop_column('matches', 'feedback_p1')
    op.drop_column('matches', 'feedback_p2')
