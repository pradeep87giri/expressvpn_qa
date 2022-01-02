export default class LocaleManager {

    private propertiesReader
    private filePath: string

    constructor() {
        this.propertiesReader = require('properties-reader');
        this.filePath = './locale_files/en-US.properties';
    }

    public getProperty(locale: string, key: string) {
        //Select en-US locale by default if no locale is provided
        if (locale != null) {
            this.filePath = './locale_files/' + locale
        }
        var properties = this.propertiesReader(this.filePath);
        return properties.get(key)
    }

    public setProperty(locale: string, key: string, value: string) {
        //Select en-US locale by default if no locale is provided
        if (locale != null) {
            this.filePath = './locale_files/' + locale
        }
        var properties = this.propertiesReader(this.filePath);
        return properties.set(key, value)
    }

}