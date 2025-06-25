import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Center, Title, Text, Button, Stack, Box } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'

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
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <path
                  d="M22,16 L22,14.5 C22,14.2238576 21.7761424,14 21.5,14 L16.7002966,14 L9.30029663,9 L3.5,9 C3.22385763,9 3,9.22385763 3,9.5 L3,11 L9.30029663,11 L13.5526705,14 L8.30029663,14 L6.30029663,13 L3.5,13 C3.22385763,13 3,13.2238576 3,13.5 L3,15 L7.30029663,15 L9.30029663,16 L21.5,16 C21.7761424,16 22,15.7761424 22,15.5 L22,16 Z"
                  fill="#4DABF7"
                />
                <path
                  d="M22,15.5 L22,14.5 C22,14.2238576 21.7761424,14 21.5,14 L16.7002966,14 L9.30029663,9 L3.5,9 C3.22385763,9 3,9.22385763 3,9.5 L3,10.5 C3,10.2238576 3.22385763,10 3.5,10 L9.30029663,10 L16.7002966,15 L21.5,15 C21.7761424,15 22,14.7761424 22,14.5 L22,15.5 Z M22,15.5 L22,14.5 C22,14.2238576 21.7761424,14 21.5,14 L16.7002966,14 L13.5526705,14 L9.30029663,13 L3.5,13 C3.22385763,13 3,13.2238576 3,13.5 L3,14.5 C3,14.2238576 3.22385763,14 3.5,14 L7.30029663,14 L9.30029663,15 L21.5,15 C21.7761424,15 22,14.7761424 22,14.5 L22,15.5 Z"
                  fill="#228BE6"
                />
              </g>
            </svg>
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

        <Title order={1} style={{ fontSize: '3rem', color: '#1c7ed6' }}>
          {t('title')}
        </Title>

        <Title
          order={2}
          style={{ fontSize: '1.5rem', color: '#4dabf7', marginTop: '-15px' }}
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
