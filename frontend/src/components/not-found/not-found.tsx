import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Center, Title, Text, Button, Stack, Box } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import airplaneSvg from '../../assets/plane.svg'

export const NotFound = () => {
  const { t } = useTranslation('notFound')
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <Center style={{ height: '100%' }}>
      <Stack align="center" style={{ maxWidth: '500px' }}>
        <Box
          style={{
            position: 'relative',
            width: '100%',
            height: '200px',
            overflow: 'hidden',
          }}
        >
          <Box
            style={{
              position: 'absolute',
              width: '100px',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%) rotate(-5deg)',
              animation: 'flying 3s ease-in-out infinite',
              filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))',
            }}
          >
            <img
              src={airplaneSvg}
              alt="Airplane"
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </Box>
          <style>
            {`
              @keyframes flying {
                0%, 100% { 
                  transform: translate(-50%, -50%) rotate(-5deg);
                }
                50% { 
                  transform: translate(-50%, -60%) rotate(5deg);
                }
              }
            `}
          </style>
        </Box>

        <Title
          order={1}
          style={{ fontSize: '3rem', color: '#1c7ed6', textAlign: 'center' }}
        >
          {t('title')}
        </Title>

        <Title
          order={2}
          style={{
            fontSize: '1.5rem',
            color: '#4dabf7',
            marginTop: '-15px',
            textAlign: 'center',
          }}
        >
          {t('message')}
        </Title>

        <Text
          c="dimmed"
          size="lg"
          style={{ maxWidth: '400px', textAlign: 'center' }}
        >
          {t('description')}
        </Text>

        <Button
          leftSection={<IconArrowLeft size={16} />}
          size="lg"
          radius="xl"
          color="blue"
          onClick={handleGoHome}
          style={{
            marginTop: '20px',
            background: 'linear-gradient(45deg, #4dabf7, #228be6)',
            boxShadow: '0 4px 14px rgba(34, 139, 230, 0.4)',
          }}
        >
          {t('buttonText')}
        </Button>

        <Text
          fs="italic"
          c="dimmed"
          size="sm"
          style={{
            maxWidth: '350px',
            marginTop: '20px',
            padding: '15px',
            background: 'rgba(241, 243, 245, 0.8)',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          {t('funFact')}
        </Text>
      </Stack>
    </Center>
  )
}
