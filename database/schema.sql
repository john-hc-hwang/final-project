CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "workouts" (
	"workoutId" serial NOT NULL,
	"userId" integer NOT NULL,
	"exercise" TEXT NOT NULL,
	"weight" integer NOT NULL,
	"sets" integer NOT NULL,
	"reps" integer NOT NULL,
	"rest" integer NOT NULL,
	"date" DATE NOT NULL,
	"completed" BOOLEAN NOT NULL,
	"excuse" TEXT NOT NULL,
	CONSTRAINT "workouts_pk" PRIMARY KEY ("workoutId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "workouts" ADD CONSTRAINT "workouts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
