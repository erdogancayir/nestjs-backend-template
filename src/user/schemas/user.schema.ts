import * as mongoose from 'mongoose';
import validator from 'validator';
import * as bcrypt from 'bcrypt';

/* 
Bu şemada tanımlanan her alanın (örneğin fullName, email),veritabanına kaydedilmeden önce 
    nasıl işleneceğini ve doğrulanacağını belirleyen özellikler ekledik.
*/
export const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        minlength: 2,
        maxlength: 100,
        required: [true, 'FULL_NAME_REQUIRED'],
    },
    email: {
        type: String,
        lowercase: true,
        validate: validator.isEmail,
        maxlength: 100,
        required: [true, 'EMAIL_REQUIRED'],
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: [true, 'PASSWORD_IS_BLANK'],
    },
    address: [{
        city: String,
        district: String,
        openAdress: String
        //...
    }],
    phoneNumber: {
        type: String,
        validate: validator.isMobilePhone, // Mobil telefon numarasını doğrular.
        required: [false, 'PHONE_NUMBER_OPTIONAL'],
    },
    profilPicture: {
        type: String,
        default: '' // Varsayılan değer olarak boş bir string atanabilir.
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    bankAccountNumber: {
        type: String,
        maxlength: 32,
    },
    bankAccountOwnerName: {
        type: String,
        minlength: 6,
        maxlength: 255,
    },
    roles: {
        type: [String],
        default: ['user'],
    },
    verification: {
        type: String,
        validate: validator.isUUID,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationExpires: {
        type: Date,
        default: Date.now,
    },
    loginAttempts: {
        type: Number,
        default: 0,
    },
    blockExpires: {
      type: Date,
      default: Date.now,
    },
}, {
    versionKey: false,
    timestamps: true,
});


/* 
Mongoose için bir "pre-save" ara katman (middleware) tanımlıyor. Bu ara katman, 
UserSchema'ya bağlı bir kullanıcı nesnesi veritabanına kaydedilmeden hemen önce çalışır.
*/

//Bu satır, UserSchema şemasına bir "pre-save" hook (ara katman) ekler. Bu hook, bir kullanıcı nesnesi veritabanına kaydedilmeden önce tetiklenir.
UserSchema.pre('save', async function(next) {
    try {
    //Eğer password alanı değiştirilmediyse, hiçbir işlem yapmadan sonraki ara katmana (next) geçilir.
      if (!this.isModified('password')) {
        return next();
      }
      // tslint:disable-next-line:no-string-literal
      //Eğer password alanı değişmişse, bcrypt kütüphanesi kullanılarak bu parola hash'lenir.
      const hashed = await bcrypt.hash(this['password'], 10);
      // tslint:disable-next-line:no-string-literal
      //Hash'lenmiş parola, kullanıcı nesnesinin password alanına atanır. 
      this['password'] = hashed;
      return next();
    } catch (err) {
      return next(err);
    }
  });
