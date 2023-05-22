CREATE TABLE texts (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL,
  en TEXT NOT NULL,
  fr TEXT NOT NULL
);

CREATE TABLE configs (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL,
  value TEXT NOT NULL
);

COPY texts(key, en, fr) FROM '/csv/texts.csv' DELIMITER ',' CSV HEADER;
COPY configs(key, value) FROM '/csv/configs.csv' DELIMITER ',' CSV HEADER;
