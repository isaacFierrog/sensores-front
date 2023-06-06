import { useNotification } from 'naive-ui'


export default () => {
    const notification = useNotification();

    const notificacion = (tipo, { content, meta }) => {
        notification[tipo]({
            content,
            meta,
            keepAliveOnHover: true,
            duration: 2500,
        })
    }
    
    return {
        //metodos
        notificacion,
    }
}