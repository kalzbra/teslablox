-- One row per quiz attempt. An attempt is "finished" once finished_at is set; a week counts as
-- passed once any finished attempt for it has score = out_of.
CREATE TABLE attempts (
  id TEXT PRIMARY KEY,
  week_id TEXT NOT NULL,
  started_at INTEGER NOT NULL,
  finished_at INTEGER,
  score INTEGER,
  out_of INTEGER NOT NULL
);

CREATE INDEX attempts_week ON attempts (week_id, started_at);

-- First answer per question per attempt is final (no changing answers after seeing the result).
CREATE TABLE answers (
  attempt_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  answer TEXT NOT NULL,
  correct INTEGER NOT NULL,
  answered_at INTEGER NOT NULL,
  PRIMARY KEY (attempt_id, question_id)
);
