import style from './StudentHomeScreen.module.scss'
import warningImage from '../../../../public/assets/warning.png'
import timetableImage from '../../../../public/assets/timetable.png'
import { ButtonComponent } from '../../../components/ButtonComponent'
import { useRouter } from 'next/router'
import { ButtonHomeScreen } from '../../../models/ButtonHomeScreen'
import { UserAvatar } from '../../../components/UserAvatar'

export function StudentHomeScreen() {
  const router = useRouter()
  const buttonsList: ButtonHomeScreen[] = [
    {
      image: warningImage,
      alt: 'Botão de avisos',
      title: 'Avisos',
      onClickCallback: () => {
        router.push('/student/warnings')
      },
    },
    {
      image: timetableImage,
      alt: 'Botão de faltas',
      title: 'Faltas',
      onClickCallback: () => {
        router.push('/student/absences')
      },
    },
  ]

  return (
    <>
      <UserAvatar occupation="student" />

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
