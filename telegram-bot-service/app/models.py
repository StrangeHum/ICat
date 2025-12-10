from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, DateTime, Enum, ForeignKey, Text, JSON
)
from sqlalchemy.orm import relationship, declarative_base
import enum

Base = declarative_base()


class TimestampMixin:
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# ==== ENUMS ====

class SourceType(enum.Enum):
    telegram = "telegram"
    whatsapp = "whatsapp"
    web = "web"
    manual = "manual"


class ProblemStatus(enum.Enum):
    open = "open"
    in_progress = "in_progress"
    resolved = "resolved"
    closed = "closed"


class ProblemPriority(enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"
    urgent = "urgent"


# ==== MODELS ====

class Organization(Base, TimestampMixin):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    address = Column(String(255))
    contact_email = Column(String(255))

    users = relationship("User", back_populates="organization", cascade="all,delete")
    anydesks = relationship("AnyDeskRecord", back_populates="organization", cascade="all,delete")
    problems = relationship("Problem", back_populates="organization", cascade="all,delete")


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"))
    username = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    phone_number = Column(String(50))
    role = Column(String(50), default="client")

    organization = relationship("Organization", back_populates="users")
    problems = relationship("Problem", back_populates="user", foreign_keys="[Problem.user_id]")
    assigned_problems = relationship("Problem", back_populates="assignee", foreign_keys="[Problem.assigned_to]")


class AnyDeskRecord(Base, TimestampMixin):
    __tablename__ = "anydesk_records"

    id = Column(Integer, primary_key=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"))
    anydesk_number = Column(String(50), nullable=False)
    comment = Column(Text)

    organization = relationship("Organization", back_populates="anydesks")


class Problem(Base, TimestampMixin):
    __tablename__ = "problems"

    id = Column(Integer, primary_key=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"))
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    assigned_to = Column(Integer, ForeignKey("users.id"), nullable=True)
    source = Column(Enum(SourceType), nullable=False)
    status = Column(Enum(ProblemStatus), default=ProblemStatus.open)
    title = Column(String(255))
    description = Column(Text)
    priority = Column(Enum(ProblemPriority), default=ProblemPriority.medium)

    organization = relationship("Organization", back_populates="problems")
    user = relationship("User", back_populates="problems", foreign_keys=[user_id])
    assignee = relationship("User", back_populates="assigned_problems", foreign_keys=[assigned_to])
    attachments = relationship("ProblemAttachment", back_populates="problem", cascade="all,delete")
    logs = relationship("ProblemLog", back_populates="problem", cascade="all,delete")


class ProblemAttachment(Base, TimestampMixin):
    __tablename__ = "problem_attachments"

    id = Column(Integer, primary_key=True)
    problem_id = Column(Integer, ForeignKey("problems.id"))
    content_type = Column(String(20))  # text / image / file
    content_text = Column(Text, nullable=True)
    file_url = Column(String(255), nullable=True)

    problem = relationship("Problem", back_populates="attachments")


class ProblemLog(Base):
    __tablename__ = "problem_logs"

    id = Column(Integer, primary_key=True)
    problem_id = Column(Integer, ForeignKey("problems.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    action = Column(String(100))
    details = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

    problem = relationship("Problem", back_populates="logs")
