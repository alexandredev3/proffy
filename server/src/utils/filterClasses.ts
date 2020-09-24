import { db } from '../database/connection';
import { convertHourToMinutes, convertMinutesToHour } from '../utils/formatDate';

interface Props {
  week_day?: string;
  time?: string;
  subject?: string | any;
  isFindAll: boolean;
}

interface ClassItem {
  id: number;
  subject: string;
  cost: string;
  whatsapp: string;
  bio: string;
  user_id: number;
  name: string;
  avatar_id: number;
  path: string;
}

interface ScheduleItem {
  id: number;
  class_id: number;
  week_day: number;
  from: number;
  to: number;
}

async function filterClasses(props: Props) {
  const { isFindAll, time, week_day, subject } = props;

  const classes = await db('classes')
    .whereExists(function() {
      // vai fazer que o schedule fique dentro do objeto do class.
      if (isFindAll) {
        return this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('class_schedule.class_id = classes.id')
      }
      const timeInMinutes = convertHourToMinutes(String(time));

      this.select('class_schedule.*')
        .from('class_schedule')
        .whereRaw('class_schedule.class_id = classes.id')
        .whereRaw('class_schedule.week_day = ??', [Number(week_day)])
        .whereRaw('class_schedule.from <= ??', [timeInMinutes])
        .whereRaw('class_schedule.to > ??', [timeInMinutes])

      return this.select('classes.*')
        .from('classes')
        .where('classes.subject', subject);
    })
    .join('users', 'classes.user_id', '=', 'users.id')
    .join('files', 'files.id', '=', 'users.avatar_id')
    .join('class_schedule', 'class_schedule.class_id', '=', 'classes.id')
    .select([
      'classes.*',
      'users.name', 'users.avatar_id', 'files.path',
      'class_schedule.*'
    ]);

    const classesList = classes?.map((item: ClassItem) => {
      const { 
        id,
        avatar_id,
        name,
        bio,
        whatsapp,
        cost,
        subject,
        user_id,
        path,
      } = item;

      return {
        class: {
          id,
          user_id,
          name,
          avatar_url: avatar_id == null ? null : `http://${process.env.IMAGE_URL}/files/${path}`,
          subject,
          whatsapp,
          bio,
          cost,
        }
      }
    });

    const schedulesList = classes?.map((item: ScheduleItem) => {
      const { 
        class_id,
        id,
        week_day,
        from,
        to
      } = item;

      return {
        schedule: {
          id,
          class_id,
          week_day,
          from: convertMinutesToHour(from),
          to: convertMinutesToHour(to)
        }
      }
    });

  return { classesList, schedulesList };
}

export { filterClasses }