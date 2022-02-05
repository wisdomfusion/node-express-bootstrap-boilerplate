let config = {
    API_URL_PREFIX: '', // DEV 环境接口域名前缀
};

const targetEnv = process.env.TARGET_ENV || 'development';

if (targetEnv === 'staging') {
    config.API_URL_PREFIX = ''; // STAGE 环境接口域名前缀
} else if (targetEnv === 'production') {
    config.API_URL_PREFIX = ''; // PROD 环境
}

export default config;
