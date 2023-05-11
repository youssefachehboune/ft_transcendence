CREATE TABLE txts (
  id SERIAL PRIMARY KEY,
  en TEXT NOT NULL,
  fr TEXT NOT NULL
);

COPY txts(en, fr) FROM '/csv/txts.csv' DELIMITER ',' CSV HEADER;
