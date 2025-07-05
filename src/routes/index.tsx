import { createFileRoute } from '@tanstack/react-router'
import { App, Button } from 'antd'
import { ThemeSwitcher } from '~/components/ThemeSwitcher';
export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { message } = App.useApp();
  const handleToast = ()=> {
    message.success("Hello")
  }
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <Button onClick={handleToast}>BUtton</Button>
      <ThemeSwitcher></ThemeSwitcher>
    </div>
  )
}
