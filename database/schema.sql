set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

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
	"exerciseName" TEXT NOT NULL,
	"weight" integer NOT NULL,
	"sets" integer NOT NULL,
	"reps" integer NOT NULL,
	"restTime" integer NOT NULL,
	CONSTRAINT "workouts_pk" PRIMARY KEY ("workoutId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "dates" (
	"dateId" serial NOT NULL,
	"date" DATE NOT NULL,
	"completed" BOOLEAN NOT NULL,
	"excuse" TEXT NOT NULL,
	CONSTRAINT "dates_pk" PRIMARY KEY ("dateId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "dateWorkouts" (
	"dateId" integer NOT NULL,
	"workoutId" serial NOT NULL,
	CONSTRAINT "dateWorkouts_pk" PRIMARY KEY ("dateId","workoutId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "workouts" ADD CONSTRAINT "workouts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "dateWorkouts" ADD CONSTRAINT "dateWorkouts_fk0" FOREIGN KEY ("dateId") REFERENCES "dates"("dateId");
ALTER TABLE "dateWorkouts" ADD CONSTRAINT "dateWorkouts_fk1" FOREIGN KEY ("workoutId") REFERENCES "workouts"("workoutId");
