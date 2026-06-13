import joi from 'joi'
import BaseDto from '../../common/dto/base.dto.js'

class ForgotPasswordDto extends BaseDto{
    static schema = Joi.object({
        email : Joi.string().lowercase().required()
    })
}

export default ForgotPasswordDto