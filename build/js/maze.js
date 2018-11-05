"use strict";
var Utils = /** @class */ (function () {
    // public self: Utils;
    function Utils() {
        this.Back = "B";
        this.North = "N";
        this.East = "E";
        this.South = "S";
        this.West = "W";
        this.Up = "U";
        this.Down = "D";
        this.Directions = [
            this.North,
            this.South,
            this.West,
            this.East,
            this.Up,
            this.Down,
        ];
        // this.self = new Utils();
    }
    Utils.prototype.getRandomIntInclusive = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
        // The maximum is inclusive and the minimum is inclusive
    };
    Utils.prototype.getRandomDirections = function () {
        return this.shuffle(this.Directions);
    };
    /**
     * Given a decompressed template, return a path, start, and end
     * @param template the decompressed template to break apart
     */
    Utils.prototype.getLocationsFromTemplate = function (template) {
        template = LZString.decompressFromEncodedURIComponent(template);
        var arr = template.split("|");
        var start = JSON.parse(arr[1]);
        var end = JSON.parse(arr[2]);
        var path = arr[0].split("");
        return { Path: path, Start: start, End: end };
    };
    // 	next = template.shift();
    // 	if(next === undefined) {
    // 	next = "";
    // }
    // public getNextActionFromTemplate(template: string[]) {
    // 	let next = template.shift();
    // 	if (typeof next === undefined || next === undefined) {
    // 		next = "";
    // 	}
    // 	return [next, template];
    // }
    /**
     * Shuffles array in place.
     * @param {Array} array items An array containing the items.
     */
    Utils.prototype.shuffle = function (array) {
        var j;
        var x;
        var i;
        for (i = array.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
        return array;
    };
    return Utils;
}());
// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// For more information, the home page:
// http://pieroxy.net/blog/pages/lz-string/testing.html
//
// LZ-based compression algorithm, version 1.4.4
var LZString = (function () {
    // private property
    var f = String.fromCharCode;
    var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
    var baseReverseDic = {};
    function getBaseValue(alphabet, character) {
        if (!baseReverseDic[alphabet]) {
            baseReverseDic[alphabet] = {};
            for (var i = 0; i < alphabet.length; i++) {
                baseReverseDic[alphabet][alphabet.charAt(i)] = i;
            }
        }
        return baseReverseDic[alphabet][character];
    }
    var LZString = {
        // compressToBase64: function (input) {
        //	 if (input == null) return "";
        //	 var res = LZString._compress(input, 6, function (a) { return keyStrBase64.charAt(a); });
        //	 switch (res.length % 4) { // To produce valid Base64
        //		 default: // When could this happen ?
        //		 case 0: return res;
        //		 case 1: return res + "===";
        //		 case 2: return res + "==";
        //		 case 3: return res + "=";
        //	 }
        // },
        // decompressFromBase64: function (input) {
        //	 if (input == null) return "";
        //	 if (input == "") return null;
        //	 return LZString._decompress(input.length, 32, function (index) { return getBaseValue(keyStrBase64, input.charAt(index)); });
        // },
        // compressToUTF16: function (input) {
        //	 if (input == null) return "";
        //	 return LZString._compress(input, 15, function (a) { return f(a + 32); }) + " ";
        // },
        // decompressFromUTF16: function (compressed) {
        //	 if (compressed == null) return "";
        //	 if (compressed == "") return null;
        //	 return LZString._decompress(compressed.length, 16384, function (index) { return compressed.charCodeAt(index) - 32; });
        // },
        // //compress into uint8array (UCS-2 big endian format)
        // compressToUint8Array: function (uncompressed) {
        //	 var compressed = LZString.compress(uncompressed);
        //	 var buf = new Uint8Array(compressed.length * 2); // 2 bytes per character
        //	 for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
        //		 var current_value = compressed.charCodeAt(i);
        //		 buf[i * 2] = current_value >>> 8;
        //		 buf[i * 2 + 1] = current_value % 256;
        //	 }
        //	 return buf;
        // },
        // //decompress from uint8array (UCS-2 big endian format)
        // decompressFromUint8Array: function (compressed) {
        //	 if (compressed === null || compressed === undefined) {
        //		 return LZString.decompress(compressed);
        //	 } else {
        //		 var buf = new Array(compressed.length / 2); // 2 bytes per character
        //		 for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
        //			 buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
        //		 }
        //		 var result = [];
        //		 buf.forEach(function (c) {
        //			 result.push(f(c));
        //		 });
        //		 return LZString.decompress(result.join(''));
        //	 }
        // },
        //compress into a string that is already URI encoded
        compressToEncodedURIComponent: function (input) {
            if (input == null)
                return "";
            return LZString._compress(input, 6, function (a) { return keyStrUriSafe.charAt(a); });
        },
        //decompress from an output of compressToEncodedURIComponent
        decompressFromEncodedURIComponent: function (input) {
            input = input.replace(/ /g, "+");
            var output = "";
            if (input != null) {
                // if (input == "") return null;
                output = LZString._decompress(input.length, 32, function (index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });
                if (output != null) {
                    return output;
                }
            }
            return "";
        },
        compress: function (uncompressed) {
            return LZString._compress(uncompressed, 16, function (a) { return f(a); });
        },
        _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
            if (uncompressed == null)
                return "";
            var i, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, // Compensate for the first entry which should not count
            context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii;
            for (ii = 0; ii < uncompressed.length; ii += 1) {
                context_c = uncompressed.charAt(ii);
                if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
                    context_dictionary[context_c] = context_dictSize++;
                    context_dictionaryToCreate[context_c] = true;
                }
                context_wc = context_w + context_c;
                if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
                    context_w = context_wc;
                }
                else {
                    if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                        if (context_w.charCodeAt(0) < 256) {
                            for (i = 0; i < context_numBits; i++) {
                                context_data_val = (context_data_val << 1);
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                }
                                else {
                                    context_data_position++;
                                }
                            }
                            value = context_w.charCodeAt(0);
                            for (i = 0; i < 8; i++) {
                                context_data_val = (context_data_val << 1) | (value & 1);
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                }
                                else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }
                        }
                        else {
                            value = 1;
                            for (i = 0; i < context_numBits; i++) {
                                context_data_val = (context_data_val << 1) | value;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                }
                                else {
                                    context_data_position++;
                                }
                                value = 0;
                            }
                            value = context_w.charCodeAt(0);
                            for (i = 0; i < 16; i++) {
                                context_data_val = (context_data_val << 1) | (value & 1);
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                }
                                else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }
                        }
                        context_enlargeIn--;
                        if (context_enlargeIn == 0) {
                            context_enlargeIn = Math.pow(2, context_numBits);
                            context_numBits++;
                        }
                        delete context_dictionaryToCreate[context_w];
                    }
                    else {
                        value = context_dictionary[context_w];
                        for (i = 0; i < context_numBits; i++) {
                            context_data_val = (context_data_val << 1) | (value & 1);
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            }
                            else {
                                context_data_position++;
                            }
                            value = value >> 1;
                        }
                    }
                    context_enlargeIn--;
                    if (context_enlargeIn == 0) {
                        context_enlargeIn = Math.pow(2, context_numBits);
                        context_numBits++;
                    }
                    // Add wc to the dictionary.
                    context_dictionary[context_wc] = context_dictSize++;
                    context_w = String(context_c);
                }
            }
            // Output the code for w.
            if (context_w !== "") {
                if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                    if (context_w.charCodeAt(0) < 256) {
                        for (i = 0; i < context_numBits; i++) {
                            context_data_val = (context_data_val << 1);
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            }
                            else {
                                context_data_position++;
                            }
                        }
                        value = context_w.charCodeAt(0);
                        for (i = 0; i < 8; i++) {
                            context_data_val = (context_data_val << 1) | (value & 1);
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            }
                            else {
                                context_data_position++;
                            }
                            value = value >> 1;
                        }
                    }
                    else {
                        value = 1;
                        for (i = 0; i < context_numBits; i++) {
                            context_data_val = (context_data_val << 1) | value;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            }
                            else {
                                context_data_position++;
                            }
                            value = 0;
                        }
                        value = context_w.charCodeAt(0);
                        for (i = 0; i < 16; i++) {
                            context_data_val = (context_data_val << 1) | (value & 1);
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            }
                            else {
                                context_data_position++;
                            }
                            value = value >> 1;
                        }
                    }
                    context_enlargeIn--;
                    if (context_enlargeIn == 0) {
                        context_enlargeIn = Math.pow(2, context_numBits);
                        context_numBits++;
                    }
                    delete context_dictionaryToCreate[context_w];
                }
                else {
                    value = context_dictionary[context_w];
                    for (i = 0; i < context_numBits; i++) {
                        context_data_val = (context_data_val << 1) | (value & 1);
                        if (context_data_position == bitsPerChar - 1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                        }
                        else {
                            context_data_position++;
                        }
                        value = value >> 1;
                    }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                    context_enlargeIn = Math.pow(2, context_numBits);
                    context_numBits++;
                }
            }
            // Mark the end of the stream
            value = 2;
            for (i = 0; i < context_numBits; i++) {
                context_data_val = (context_data_val << 1) | (value & 1);
                if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                }
                else {
                    context_data_position++;
                }
                value = value >> 1;
            }
            // Flush the last char
            while (true) {
                context_data_val = (context_data_val << 1);
                if (context_data_position == bitsPerChar - 1) {
                    context_data.push(getCharFromInt(context_data_val));
                    break;
                }
                else
                    context_data_position++;
            }
            return context_data.join('');
        },
        decompress: function (compressed) {
            if (compressed == null)
                return "";
            if (compressed == "")
                return null;
            return LZString._decompress(compressed.length, 32768, function (index) { return compressed.charCodeAt(index); });
        },
        _decompress: function (length, resetValue, getNextValue) {
            var dictionary = [], next, enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w, bits, resb, maxpower, power, c, data = { val: getNextValue(0), position: resetValue, index: 1 };
            for (i = 0; i < 3; i += 1) {
                dictionary[i] = i;
            }
            bits = 0;
            maxpower = Math.pow(2, 2);
            power = 1;
            while (power != maxpower) {
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
            }
            switch (next = bits) {
                case 0:
                    bits = 0;
                    maxpower = Math.pow(2, 8);
                    power = 1;
                    while (power != maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb > 0 ? 1 : 0) * power;
                        power <<= 1;
                    }
                    c = f(bits);
                    break;
                case 1:
                    bits = 0;
                    maxpower = Math.pow(2, 16);
                    power = 1;
                    while (power != maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb > 0 ? 1 : 0) * power;
                        power <<= 1;
                    }
                    c = f(bits);
                    break;
                case 2:
                    return "";
            }
            dictionary[3] = c;
            w = c;
            result.push(c);
            while (true) {
                if (data.index > length) {
                    return "";
                }
                bits = 0;
                maxpower = Math.pow(2, numBits);
                power = 1;
                while (power != maxpower) {
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (data.position == 0) {
                        data.position = resetValue;
                        data.val = getNextValue(data.index++);
                    }
                    bits |= (resb > 0 ? 1 : 0) * power;
                    power <<= 1;
                }
                switch (c = bits) {
                    case 0:
                        bits = 0;
                        maxpower = Math.pow(2, 8);
                        power = 1;
                        while (power != maxpower) {
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb > 0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        dictionary[dictSize++] = f(bits);
                        c = dictSize - 1;
                        enlargeIn--;
                        break;
                    case 1:
                        bits = 0;
                        maxpower = Math.pow(2, 16);
                        power = 1;
                        while (power != maxpower) {
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb > 0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        dictionary[dictSize++] = f(bits);
                        c = dictSize - 1;
                        enlargeIn--;
                        break;
                    case 2:
                        return result.join('');
                }
                if (enlargeIn == 0) {
                    enlargeIn = Math.pow(2, numBits);
                    numBits++;
                }
                if (dictionary[c]) {
                    entry = dictionary[c];
                }
                else {
                    if (c === dictSize) {
                        entry = w + w.charAt(0);
                    }
                    else {
                        return null;
                    }
                }
                result.push(entry);
                // Add w+entry[0] to the dictionary.
                dictionary[dictSize++] = w + entry.charAt(0);
                enlargeIn--;
                w = entry;
                if (enlargeIn == 0) {
                    enlargeIn = Math.pow(2, numBits);
                    numBits++;
                }
            }
        }
    };
    return LZString;
})();
// if (typeof define === 'function' && define.amd) {
//	 define(function () { return LZString; });
// } else if (typeof module !== 'undefined' && module != null) {
//	 module.exports = LZString
// } else if (typeof angular !== 'undefined' && angular != null) {
//	 angular.module('LZString', [])
//		 .factory('LZString', function () {
//			 return LZString;
//		 });
// }
var Cell = /** @class */ (function () {
    function Cell(z, y, x) {
        this.North = false;
        this.East = false;
        this.South = false;
        this.West = false;
        this.Up = false;
        this.Down = false;
        this.Z = z;
        this.Y = y;
        this.X = x;
    }
    return Cell;
}());
var Character = /** @class */ (function () {
    function Character(name, startingLocation, mazeGrid, endLocation) {
        this.endLocation = endLocation;
        this.Utilities = new Utils();
        this.Name = name;
        this.CurrentLocation = startingLocation;
        this.MazeGrid = mazeGrid;
        this.GridLayers = this.MazeGrid.length;
        this.GridWidth = this.MazeGrid[0].length;
        this.GridHeight = this.MazeGrid[0][0].length;
        this.EndLocation = endLocation;
        this.IsMazeSolved = false;
    }
    Character.prototype.move = function (direction) {
        switch (direction) {
            case this.Utilities.North:
                if (this.CurrentLocation.North && this.CurrentLocation.Y > 0)
                    this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y - 1][this.CurrentLocation.X];
                break;
            case this.Utilities.East:
                if (this.CurrentLocation.East && this.CurrentLocation.X < this.GridWidth - 1)
                    this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X + 1];
                break;
            case this.Utilities.South:
                if (this.CurrentLocation.South && this.CurrentLocation.Y < this.GridHeight - 1)
                    this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y + 1][this.CurrentLocation.X];
                break;
            case this.Utilities.West:
                if (this.CurrentLocation.West && this.CurrentLocation.X > 0)
                    this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X - 1];
                break;
            case this.Utilities.Up:
                if (this.CurrentLocation.Z === this.GridLayers - 1)
                    this.CurrentLocation = this.MazeGrid[0][this.CurrentLocation.Y][this.CurrentLocation.X];
                else
                    this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z + 1][this.CurrentLocation.Y][this.CurrentLocation.X];
                break;
            case this.Utilities.Down:
                if (this.CurrentLocation.Z === 0)
                    this.CurrentLocation = this.MazeGrid[this.GridLayers - 1][this.CurrentLocation.Y][this.CurrentLocation.X];
                else
                    this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z - 1][this.CurrentLocation.Y][this.CurrentLocation.X];
                break;
        }
        if (this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X] ===
            this.MazeGrid[this.EndLocation.Z][this.EndLocation.Y][this.EndLocation.X]) {
            // SOLVED THE MAZE!
            this.IsMazeSolved = true;
        }
        return {
            Character: {
                Z: this.CurrentLocation.Z,
                Y: this.CurrentLocation.Y,
                X: this.CurrentLocation.X
            },
            End: {
                Z: this.EndLocation.Z,
                Y: this.EndLocation.Y,
                X: this.EndLocation.X
            },
            IsMazeSolved: this.IsMazeSolved
        };
    };
    return Character;
}());
var HTMLCharacterView = /** @class */ (function () {
    function HTMLCharacterView(name, characterIcon, solvedCharacterEndIcon, mazeEndIcon, solvedMazeEndIcon) {
        this.IsMazeSolved = false;
        this.Name = name;
        this.CharacterIcon = characterIcon;
        this.SolvedCharacterIcon = solvedCharacterEndIcon;
        this.EndIcon = mazeEndIcon;
        this.SolvedEndIcon = solvedMazeEndIcon;
        this.CurrentCharacterIcon = characterIcon;
        this.CurrentEndIcon = mazeEndIcon;
        this.CharacterLocation = { Z: -1, Y: -1, X: -1 };
        this.EndLocation = { Z: -1, Y: -1, X: -1 };
    }
    HTMLCharacterView.prototype.setCharacterIcon = function () {
        if (this.IsMazeSolved) {
            // SOLVED THE MAZE!
            this.CurrentCharacterIcon = this.SolvedCharacterIcon;
            this.CurrentEndIcon = this.SolvedEndIcon;
        }
        else {
            this.CurrentCharacterIcon = this.CharacterIcon;
            this.CurrentEndIcon = this.EndIcon;
        }
    };
    HTMLCharacterView.prototype.move = function (locations) {
        var selectedCells = document.querySelectorAll(".y" + this.CharacterLocation.Y + "x" + this.CharacterLocation.X);
        for (var i = 0; i < selectedCells.length; i++) {
            selectedCells[i].innerHTML = "";
        }
        this.CharacterLocation = locations.Character;
        this.EndLocation = locations.End;
        this.IsMazeSolved = locations.IsMazeSolved;
        var playAgain = document.querySelector("#play-again");
        if (this.IsMazeSolved) {
            playAgain.style.display = "block";
            this.CurrentCharacterIcon = this.SolvedCharacterIcon;
            this.CurrentEndIcon = this.SolvedEndIcon;
        }
        else {
            playAgain.style.display = "none";
            this.CurrentCharacterIcon = this.CharacterIcon;
            this.CurrentEndIcon = this.EndIcon;
        }
        var end = document.querySelector(".winter.y" + this.EndLocation.Y + "x" + this.EndLocation.X);
        end.innerHTML = this.CurrentEndIcon;
        selectedCells = document.querySelectorAll(".y" + this.CharacterLocation.Y + "x" + this.CharacterLocation.X);
        for (var i = 0; i < selectedCells.length; i++) {
            selectedCells[i].innerHTML = this.CurrentCharacterIcon;
        }
    };
    return HTMLCharacterView;
}());
// Every maze should have
// Start location
// End location
// Compressed Maze
var Maze = /** @class */ (function () {
    function Maze(gridLayers, gridWidth, gridHeight, mazeTemplateCompressed, startLocation, endLocation) {
        this.gridLayers = gridLayers;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.mazeTemplateCompressed = mazeTemplateCompressed;
        this.startLocation = startLocation;
        this.endLocation = endLocation;
        // private IsMazeSolved: boolean = false;
        // private PathTemplate: string[] = [];
        this.Utilities = new Utils();
        this.GridLayers = gridLayers;
        this.GridWidth = gridWidth;
        this.GridHeight = gridHeight;
        // generate the grid
        this.MazeGrid = this.generateGrid();
        if (mazeTemplateCompressed !== undefined) {
            // Procedural generated path
            this.MazeTemplateCompressed = mazeTemplateCompressed;
            this.MazePath = this.fillMazeProcedural(this.MazeTemplateCompressed);
        }
        else {
            // Random generated path
            if (startLocation === undefined) {
                this.StartLocation = {
                    Z: 0,
                    Y: 0,
                    X: 0
                };
            }
            else {
                this.StartLocation = startLocation;
            }
            if (endLocation === undefined) {
                this.EndLocation = {
                    Z: 0,
                    Y: this.Utilities.getRandomIntInclusive(1, this.GridHeight - 1),
                    X: this.Utilities.getRandomIntInclusive(1, this.GridWidth - 1)
                };
            }
            else {
                this.EndLocation = endLocation;
            }
            this.MazePath = this.fillMazeRandom();
            this.MazeTemplateCompressed = LZString.compressToEncodedURIComponent(this.MazePath
                + "|" + JSON.stringify(this.StartLocation)
                + "|" + JSON.stringify(this.EndLocation));
        }
    }
    Maze.prototype.generateGrid = function () {
        var tempGrid = new Array(this.GridLayers);
        for (var i = 0; i < this.GridLayers; i++) {
            tempGrid[i] = new Array(this.GridHeight);
            for (var j = 0; j < this.GridHeight; j++) {
                tempGrid[i][j] = new Array(this.GridWidth);
                tempGrid[i][j].fill();
            }
        }
        return tempGrid;
    };
    /**
     * Given a decompressed path, returns a maze path for a procedural maze
     * @param mazeTemplateCompressed given decompressed string of directions (a path)
     */
    Maze.prototype.fillMazeProcedural = function (mazeTemplateCompressed) {
        var result1 = this.Utilities.getLocationsFromTemplate(mazeTemplateCompressed);
        // tslint:disable-next-line:prefer-const
        var template = result1.Path;
        this.EndLocation = result1.End;
        this.StartLocation = result1.Start;
        // tslint:disable-next-line:prefer-const
        var cellsList = [new Cell(0, 0, 0)];
        var next;
        var mazePath = "";
        var index = -1;
        while (cellsList.length > 0) {
            // index is the newest
            index = cellsList.length - 1;
            var currentCell = cellsList[index];
            next = template.shift();
            if (next === "" || next === undefined) {
                break;
            }
            else if (next === this.Utilities.Back) {
                cellsList.splice(index, 1);
            }
            else {
                var nextCell = this.directionModifier(cellsList[index], next);
                var result2 = this.carvePathBetweenCells(currentCell, nextCell, next);
                this.MazeGrid[currentCell.Z][currentCell.Y][currentCell.X] = result2.current;
                this.MazeGrid[nextCell.Z][nextCell.Y][nextCell.X] = result2.next;
                cellsList.push(nextCell);
                index = -1;
            }
            if (index !== -1) {
                cellsList.splice(index, 1);
            }
            mazePath += next;
        }
        return mazePath;
    };
    /**
     * Returns a maze path for a random maze
     */
    Maze.prototype.fillMazeRandom = function () {
        var index = -1;
        var output = "";
        // tslint:disable-next-line:prefer-const
        var cellsList = [new Cell(this.StartLocation.Z, this.StartLocation.Y, this.StartLocation.X)];
        while (cellsList.length > 0) {
            // index is the newest
            index = cellsList.length - 1;
            var currentCell = cellsList[index];
            var directions = this.Utilities.getRandomDirections();
            for (var i = 0; i < directions.length; i++) {
                var nextCell = this.directionModifier(cellsList[index], directions[i]);
                if (this.isEmptyCell(nextCell.Z, nextCell.Y, nextCell.X)) {
                    // we found a workable direction
                    var result = this.carvePathBetweenCells(currentCell, nextCell, directions[i]);
                    this.MazeGrid[currentCell.Z][currentCell.Y][currentCell.X] = result.current;
                    this.MazeGrid[nextCell.Z][nextCell.Y][nextCell.X] = result.next;
                    cellsList.push(nextCell);
                    output += directions[i];
                    index = -1;
                    break;
                }
            }
            if (index !== -1) {
                cellsList.splice(index, 1);
                output += this.Utilities.Back;
            }
        }
        return output;
    };
    Maze.prototype.carvePathBetweenCells = function (currentCell, nextCell, direction) {
        switch (direction) {
            case this.Utilities.North:
                currentCell.North = true;
                nextCell.South = true;
                break;
            case this.Utilities.East:
                currentCell.East = true;
                nextCell.West = true;
                break;
            case this.Utilities.South:
                currentCell.South = true;
                nextCell.North = true;
                break;
            case this.Utilities.West:
                currentCell.West = true;
                nextCell.East = true;
                break;
            case this.Utilities.Up:
                currentCell.Up = true;
                nextCell.Down = true;
                break;
            case this.Utilities.Down:
                currentCell.Down = true;
                nextCell.Up = true;
                break;
        }
        return { current: currentCell, next: nextCell };
    };
    Maze.prototype.isEmptyCell = function (z, y, x) {
        if (z >= 0 && z < this.GridLayers
            && y >= 0 && y < this.GridHeight
            && x >= 0 && x < this.GridWidth
            && (this.MazeGrid[z][y][x] === null || this.MazeGrid[z][y][x] === undefined))
            return true;
        return false;
    };
    Maze.prototype.directionModifier = function (cell, direction) {
        switch (direction) {
            case this.Utilities.North:
                return new Cell(cell.Z, cell.Y - 1, cell.X);
            case this.Utilities.East:
                return new Cell(cell.Z, cell.Y, cell.X + 1);
            case this.Utilities.South:
                return new Cell(cell.Z, cell.Y + 1, cell.X);
            case this.Utilities.West:
                return new Cell(cell.Z, cell.Y, cell.X - 1);
            case this.Utilities.Up:
                // if we're at the top layer, loop around
                if (cell.Z === this.gridLayers - 1)
                    return new Cell(0, cell.Y, cell.X);
                else
                    return new Cell(cell.Z + 1, cell.Y, cell.X);
            case this.Utilities.Down:
                // if we're at the bottom layer, loop around
                if (cell.Z === 0)
                    return new Cell(this.GridLayers - 1, cell.Y, cell.X);
                else
                    return new Cell(cell.Z - 1, cell.Y, cell.X);
        }
        return new Cell(cell.Z, cell.Y, cell.Z);
    };
    return Maze;
}());
var MazeView = /** @class */ (function () {
    function MazeView(mazegrid, endCell) {
        this.mazegrid = mazegrid;
        this.endCell = endCell;
        this.MazeGrid = mazegrid;
        this.GridWidth = mazegrid[0][0].length;
        this.EndCell = endCell;
    }
    MazeView.prototype.displayMaze = function () {
        // $(`#play-again`).hide();
        var html = "";
        for (var layer = 0; layer < this.MazeGrid.length; layer++) {
            var layerName = this.getNameFromLayer(layer);
            html += "<div id=\"layer" + layer + "\" class=\"" + layerName + "\">";
            html += "<h3 class=\"" + layerName + " maze-header\">"
                + "<button onclick=\"goDown()\" class=\"down-button\" aria-label=\"Move Back\">&nbsp;</button>"
                + ("<span class=\"" + layerName + " layer-name\">" + layerName + "</span>")
                + "<button onclick=\"goUp()\" class=\"up-button\" aria-label=\"Move Forward\">&nbsp;</button>"
                + "</h3>";
            html += "<table id=\"layer" + layer + "-table\" class=\"maze-table " + layerName + "\">";
            for (var row = 0; row < this.MazeGrid[layer].length; row++) {
                html += "<tr class='r'>";
                for (var column = 0; column < this.GridWidth; column++) {
                    var classes = this.getClassesFromCell(this.MazeGrid[layer][row][column]);
                    html += "<td class=\"cell " + classes + " " + layerName + " y" + row + "x" + column + "\">&nbsp;";
                    html += "</td>";
                }
                html += "</tr> <!-- end row -->\n";
            }
            html += "</table>";
            html += "</div>";
        }
        document.body.querySelector("#maze-game").innerHTML = html;
    };
    MazeView.prototype.getClassesFromCell = function (cell) {
        var classes = "";
        if (!cell.North)
            classes += " top ";
        if (!cell.East)
            classes += " right ";
        if (!cell.South)
            classes += " bottom ";
        if (!cell.West)
            classes += " left ";
        if (!cell.Up)
            classes += " up ";
        if (!cell.Down)
            classes += " down ";
        if (this.MazeGrid[cell.Z][cell.Y][cell.X] === this.EndCell)
            classes += " end ";
        return classes;
    };
    MazeView.prototype.getNameFromLayer = function (layer) {
        switch (layer) {
            case 0:
                return "winter";
            case 1:
                return "spring";
            case 2:
                return "summer";
            case 3:
                return "fall";
            default:
                return "";
        }
    };
    return MazeView;
}());
var currentLayer;
var GridLayers;
var GridHeight;
var GridWidth;
var MyCharacter;
var MyCharacterView;
var Utilities;
var MyMaze;
function main() {
    Utilities = new Utils();
    currentLayer = 0;
    GridLayers = 4;
    GridHeight = 8;
    GridWidth = 8;
    // const exampleMaze: string = "CIUQqiqmYMq3A6rErgDkTzIm7EHpwjoYbIyJE6y4pH7aqalG4EKqzAJwxIpa"
    // + "VKLXSkSfLPWDA6qCJHy5MM2Sj4AhAhmqRYGg4mAGwYrMx2ZeBAiZjdeRZlUjaZW-QakR4MhsYMDXz8tUw11S"
    // + "ltA6I1ZGJjEeJB4+PgU9IzMrUJkrLzMqMCxCm47Lwz0fKro0FoDfGrGpuaqgB8AbwAiAC1OgC4ABgAaToBNfoA2EYANfoB2AF8gA";
    // const uncompressed = "DEUEDEDEUUSSUSWSEEEDNESSUWUUNWWWNUSENDNDNWSUUWNUUWSWUSENUNWSSUEENENDNUWUWWSUEESDSUUSUUUSWSE"
    // + "SWWNDEDSWNNDENUSUESSENDDWUSEEUEEDNWWUNEDDDWSEUSUBWWDNNUUEDSBBBWDBBUNNESEENDNNNESUUWWWWBBUUUSDSUUNUEENWNEDWWD"
    // + "DDBWSBBBESSUESSDDNUNDBBBBBSSDDDNBWUNBSEUUUWWWBBBBBBBBBDWBBBBBBBBBBWBBBBBBEBBBBBBBBBBBBSSBBBBBBBBBBBBBBBBBBBB"
    // + "BBBBBBBBBBBBBBBWWWNEBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBWWBBBBBNNWSUSDBBUUBBEBBBBBBBBBNBBBBBBBBBBBBBBBBBBBBBBB"
    // + "BBBBBBBBDESWBBNWBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB|"
    // + "{\"Z\":0,\"Y\":6,\"X\":7}";
    // const myMaze = new Maze(GridLayers, GridHeight, GridWidth, exampleMaze);
    var myMaze = new Maze(GridLayers, GridHeight, GridWidth);
    MyMaze = myMaze;
    var mazeViewer = new MazeView(myMaze.MazeGrid, myMaze.EndLocation);
    mazeViewer.displayMaze();
    // console.log(myMaze.MazePath);
    // `console.log`(myMaze.MazePathCompressed);
    // console.table(myMaze.MazeGrid[0][0]);
    showLayerHideOthers(currentLayer);
    MyCharacter = new Character("happyemoji", myMaze.MazeGrid[0][0][0], myMaze.MazeGrid, myMaze.EndLocation);
    MyCharacterView = new HTMLCharacterView(MyCharacter.Name, String.fromCharCode(0xD83D, 0xDE00), // 😀
    String.fromCharCode(0xD83D, 0xDE0E), // 😎
    String.fromCharCode(0xD83C, 0xDFC1), // 🏁
    String.fromCharCode(0xD83C, 0xDF89)); // 🎉
    MyCharacterView.move(MyCharacter.move());
}
// https://stackoverflow.com/questions/1402698/binding-arrow-keys-in-js-jquery
document.addEventListener("keydown", function (e) {
    e = e || window.event;
    switch (e.which || e.keyCode) {
        case 65: // a
        case 37: // left
            goWest();
            break;
        case 87: // w
        case 38: // up
            goNorth();
            break;
        case 68: // d
        case 39: // right
            goEast();
            break;
        case 83: // s
        case 40: // down
            goSouth();
            break;
        case 81: // 1
            goDown();
            break;
        case 69: // 1
            goUp();
            break;
        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
function showLayerHideOthers(layerChoice) {
    if (GridLayers > 1) {
        for (var layer = 0; layer < GridLayers; layer++) {
            var layerId = "#layer" + layer;
            if (layer === layerChoice)
                document.body.querySelector(layerId).style.display = "block";
            else
                document.body.querySelector(layerId).style.display = "none";
        }
    }
}
function goNorth() {
    MyCharacterView.move(MyCharacter.move(Utilities.North));
}
function goEast() {
    MyCharacterView.move(MyCharacter.move(Utilities.East));
}
function goSouth() {
    MyCharacterView.move(MyCharacter.move(Utilities.South));
}
function goWest() {
    MyCharacterView.move(MyCharacter.move(Utilities.West));
}
function goUp() {
    if (currentLayer < GridLayers - 1)
        currentLayer++;
    else
        currentLayer = 0;
    showLayerHideOthers(currentLayer);
    MyCharacterView.move(MyCharacter.move(Utilities.Up));
}
function goDown() {
    if (currentLayer === 0)
        currentLayer = GridLayers - 1;
    else
        currentLayer--;
    showLayerHideOthers(currentLayer);
    MyCharacterView.move(MyCharacter.move(Utilities.Down));
}
/*
    Use the Character class to move completely randomly through the maze
    from the given starting point to the given ending point.

    It's given a generated maze grid with starting and ending points
    It will keep going any random direction until it finds the end.
    Like any other character, it can't move through walls
    Another posibility - make it a little smarter, have it navigate the way
    that the maze generating algorithm works: keep moving until you can't,
    then back up until you get to where you want to go.

*/
var MazeNavigator = /** @class */ (function () {
    function MazeNavigator(mazeGrid, endLocation) {
        this.Character = new Character("navigator", new Cell(0, 0, 0), mazeGrid, endLocation);
        this.Utilities = new Utils();
        this.MazeGrid = mazeGrid;
    }
    MazeNavigator.prototype.navigator = function () {
        this.Utilities.getRandomDirections();
    };
    return MazeNavigator;
}());
