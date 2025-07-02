import style from './TeacherHomeScreen.module.scss'
import warningImage from '../../../../public/assets/warning.png'
import timetableImage from '../../../../public/assets/timetable.png'
import registerImage from '../../../../public/assets/register.png'
import studentImage from '../../../../public/assets/student.png'
import { ButtonComponent } from '../../../components/ButtonComponent'
import { useRouter } from 'next/router'
import { ButtonHomeScreen } from '../../../models/ButtonHomeScreen'
import { UserAvatar } from '../../../components/UserAvatar'

export function TeacherHomeScreen() {
  const router = useRouter()
  const buttonsList: ButtonHomeScreen[] = [
    {
      image: registerImage,
      alt: 'Botão de disciplinas',
      title: 'Disciplinas',
      onClickCallback: () => {
        router.push('/teacher/subjects')
      },
    },
    {
      image: studentImage,
      alt: 'Botão de alunos',
      title: 'Alunos',
      onClickCallback: () => {
        router.push('/teacher/students')
      },
    },
    {
      image: warningImage,
      alt: 'Botão de avisos',
      title: 'Avisos',

      onClickCallback: () => {
        router.push('/teacher/studentsWarnings')
      },
    },
    {
      image: timetableImage,
      alt: 'Botão de faltas',
      title: 'Faltas',
      onClickCallback: () => {
        router.push('/teacher/studentsAbsences')
      },
    },
  ]

  return (
    <>
      <UserAvatar occupation="teacher" />

      <div className={style.buttonsContainer}>
        {buttonsList?.map(
          ({ image, alt, title, onClickCallback, disabled = false }, key) => {
            return (
              <ButtonComponent
                onClickCallback={onClickCallback}
                image={image}
                alt={alt}
                title={title}
                key={key}
                disabled={disabled}
              />
            )
          },
        )}
      </div>
    </>
  )
}
