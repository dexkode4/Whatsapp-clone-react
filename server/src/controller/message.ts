import Message from '../models/messages';

interface IData {
    message: string,
    name: string,
    recieved: boolean
}

export const createMessage = async (message:IData) => {

    try {
        const result = await new Message(message).save();
        return { report:"success", code:200, data: result}
    } catch (error) {
        return {report:"error", code:500, data: error}
    }
}

export const getMessage = async () => {
    try {
        const result = await Message.find().exec();

        return {code: 200, data: result}
    }
    catch(error) {
        return {code: 500, data:error}
    }
}
