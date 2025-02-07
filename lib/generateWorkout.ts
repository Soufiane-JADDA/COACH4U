import { GoalType } from "@/app/(tabs)/goal";
import ExerciseDayGain from "@/assets/exercisesGain.json";
import ExerciseDayLoss from "@/assets/exercisesLoss.json";
import { getReferences } from "@/database/queries";

export type Reff = { goal: GoalType; equipement: boolean; injuries: string[] };

export function gainWorkout(props: { ref: Reff }) {
  //get the current day of the week
  const day = new Date().getDay();
  const dayData =
    props.ref.goal == GoalType.gain
      ? ExerciseDayGain.find((dayX) => dayX.day === day)
      : ExerciseDayLoss.find((dayX) => dayX.day === day);

  return getExercices(props.ref, dayData?.exercises as Exercise[]);
}

export type Exercise = {
  name: string;
  muscle_group: string;
  sets: number;
  reps: string;
  equipment: string;
  rest_time: string;
};

const getExercices = (ref: Reff, exercices: Exercise[]) => {
  getReferences();
  //filter by injuries
  const data1 = exercices.filter((exercise) => {
    return !ref.injuries.includes(exercise.muscle_group);
  });
  //filter by equipement
  const data2 = data1.filter((exercise) => {
    return ref.equipement
      ? !exercise.equipment.includes("Bodyweight")
      : exercise.equipment.includes("Bodyweight");
  });

  return data2;
};
