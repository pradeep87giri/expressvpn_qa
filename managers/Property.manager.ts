export default class PropertyManager {

    private propertiesReader
    private filePath: string

    constructor() {
        this.propertiesReader = require('properties-reader');
        //By default english language is choosen
        this.filePath = './locale_files/en.properties';
    }

    public getlanguageProperty(language: string, key: string) {
        //Select en-US language by default if no language is provided
        if (language != null) {
            this.filePath = './locale_files/' + language + '.properties'
        }
        var properties = this.propertiesReader(this.filePath);
        return properties.get(key)
    }

    public setlanguageProperty(language: string, key: string, value: string) {
        //Select en-US language by default if no language is provided
        if (language != null) {
            this.filePath = './locale_files/' + language + '.properties'
        }
        var properties = this.propertiesReader(this.filePath);
        return properties.set(key, value)
    }


    public getBrowserstackUser() {
        this.filePath = './credentials/browserstack.properties'
        var properties = this.propertiesReader(this.filePath);
        return properties.get("BROWSERSTACK_USERNAME")
    }

    public getBrowserstackPwd() {
        this.filePath = './credentials/browserstack.properties'
        var properties = this.propertiesReader(this.filePath);
        return properties.get("BROWSERSTACK_ACCESS_KEY")
    }

}
