// TODO: integrate dotenv?

class BigKahuna {
    constructor(args) {
        this.weight = this.length = this.size = 0;
        this.args = {};
        this.nodashArgs = {};

        this.programCall = process.argv.splice(0, 2);
        args = args || process.argv.slice(2);

        this.processArgs(args);

        this.careForDashes = false;

        // We don't want to inf-loop when we make Strict Kahunas
        if (this.constructor.name === 'BigKahuna') this.must = new StrictKahuna(args, this);
    }

    processArgs(args) {
        this.args._ = (this.args._ || []).concat(args);
        this.nodashArgs._ = (this.nodashArgs._ || []).concat(args.map(a => a.replace(/^-+/gm, '')));

        for (let i = 0; i < args.length; i++) {
            let a = args[i];
            let p = null;

            if (a.startsWith('-') && i + 1 < args.length) {
                p = args[i + 1];
                if (p.startsWith('-')) p = null;
                else i++;
            }

            this.args[a] = p;
            this.nodashArgs[a.replace(/^-+/gm, '')] = p;
        }

        this.weight = this.length = this.size = args.length;
    }

    dashCare(care) {
        if (typeof care === 'undefined') care = !this.careForDashes;
        this.careForDashes = care;
        return this;
    }

    arg(item) {
        return this.cabinet(item);
    }
    cabinet(item) {
        let args = this.nodashArgs._;
        if (this.careForDashes) args = this.args._;

        if (typeof item === 'undefined') return args;

        if (item >= args.length || item < 0) return undefined;
        else return args[item];
    }
    folders() {
        if (this.careForDashes) return this.args;
        return this.nodashArgs;
    }

    has() {
        let arg = Array.from(arguments) || [];
        if (!arg) return false;
        if (!this.careForDashes) arg = arg.map(a => a.replace(/^-+/gm, ''));

        let args = this.cabinet();

        for (const a of arg) {
            if (args.includes(a)) return true;
        }

        return false;
    }

    answer() {
        let arg = Array.from(arguments) || [];
        if (!arg) return false;
        if (!this.careForDashes) arg = arg.map(a => a.replace(/^-+/gm, ''));

        let args = this.folders();

        for (const a of arg) {
            if (args.hasOwnProperty(a)) return args[a];
        }
        return undefined;
    }
}
class StrictKahuna extends BigKahuna {
    arg(item) {
        return this.cabinet(item);
    }
    cabinet(item) {
        let c = super.cabinet(item);
        if (typeof c === 'undefined') throw new MissingRequiredArgumentException(item);
        return c;
    }
    has() {
        let doesHave = super.has.apply(this, Array.from(arguments));
        if (!doesHave) throw new MissingRequiredArgumentException(Array.from(arguments));
        return doesHave;
    }
    answer() {
        let a = super.answer.apply(this, Array.from(arguments));
        if (typeof a === 'undefined') throw new MissingRequiredArgumentException(Array.from(arguments));
        return a;
    }
}
class MissingRequiredArgumentException {
    constructor(args) {
        this.name = "MissingRequiredArgumentException";
        this.message = genMessage(args);
    }
    genMessage(args) {
        let randLol = [
            'The Kahuna needed that paperwork yesterday!',
            'This\'ll be chonked from your pay!',
            'The whole world is stopping because of this!',
            'You\' lunch break already finished, so you can\'t slack off now!'
        ];
        randLol = randLol[Math.floor(Math.random() * randLol.length)];

        return `Required argument [${args}] was not provided! ` + randLol;
    }
}

module.exports = new BigKahuna();