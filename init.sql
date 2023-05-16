CREATE TABLE txts (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL,
  en TEXT NOT NULL,
  fr TEXT NOT NULL
);

CREATE TABLE configs (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
);

COPY txts(key, en, fr) FROM '/csv/txts.csv' DELIMITER ',' CSV HEADER;
COPY txts(key, value) FROM '/csv/configs.csv' DELIMITER ',' CSV HEADER;
