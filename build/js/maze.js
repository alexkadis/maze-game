"use strict";
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
        //     if (input == null) return "";
        //     var res = LZString._compress(input, 6, function (a) { return keyStrBase64.charAt(a); });
        //     switch (res.length % 4) { // To produce valid Base64
        //         default: // When could this happen ?
        //         case 0: return res;
        //         case 1: return res + "===";
        //         case 2: return res + "==";
        //         case 3: return res + "=";
        //     }
        // },
        // decompressFromBase64: function (input) {
        //     if (input == null) return "";
        //     if (input == "") return null;
        //     return LZString._decompress(input.length, 32, function (index) { return getBaseValue(keyStrBase64, input.charAt(index)); });
        // },
        // compressToUTF16: function (input) {
        //     if (input == null) return "";
        //     return LZString._compress(input, 15, function (a) { return f(a + 32); }) + " ";
        // },
        // decompressFromUTF16: function (compressed) {
        //     if (compressed == null) return "";
        //     if (compressed == "") return null;
        //     return LZString._decompress(compressed.length, 16384, function (index) { return compressed.charCodeAt(index) - 32; });
        // },
        // //compress into uint8array (UCS-2 big endian format)
        // compressToUint8Array: function (uncompressed) {
        //     var compressed = LZString.compress(uncompressed);
        //     var buf = new Uint8Array(compressed.length * 2); // 2 bytes per character
        //     for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
        //         var current_value = compressed.charCodeAt(i);
        //         buf[i * 2] = current_value >>> 8;
        //         buf[i * 2 + 1] = current_value % 256;
        //     }
        //     return buf;
        // },
        // //decompress from uint8array (UCS-2 big endian format)
        // decompressFromUint8Array: function (compressed) {
        //     if (compressed === null || compressed === undefined) {
        //         return LZString.decompress(compressed);
        //     } else {
        //         var buf = new Array(compressed.length / 2); // 2 bytes per character
        //         for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
        //             buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
        //         }
        //         var result = [];
        //         buf.forEach(function (c) {
        //             result.push(f(c));
        //         });
        //         return LZString.decompress(result.join(''));
        //     }
        // },
        //compress into a string that is already URI encoded
        compressToEncodedURIComponent: function (input) {
            if (input == null)
                return "";
            return LZString._compress(input, 6, function (a) { return keyStrUriSafe.charAt(a); });
        },
        //decompress from an output of compressToEncodedURIComponent
        decompressFromEncodedURIComponent: function (input) {
            if (input == null)
                return "";
            if (input == "")
                return null;
            input = input.replace(/ /g, "+");
            return LZString._decompress(input.length, 32, function (index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });
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
//     define(function () { return LZString; });
// } else if (typeof module !== 'undefined' && module != null) {
//     module.exports = LZString
// } else if (typeof angular !== 'undefined' && angular != null) {
//     angular.module('LZString', [])
//         .factory('LZString', function () {
//             return LZString;
//         });
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
    Cell.prototype.get = function (input) { };
    return Cell;
}());
var Character = /** @class */ (function () {
    function Character(name, color, startingLocation, mazeGrid, endLocation) {
        this.endLocation = endLocation;
        this.North = "North";
        this.East = "East";
        this.South = "South";
        this.West = "West";
        this.Up = "Up";
        this.Down = "Down";
        this.Color = color;
        this.Name = name;
        this.CurrentLocation = startingLocation;
        this.MazeGrid = mazeGrid;
        this.GridLayers = this.MazeGrid.length;
        this.GridWidth = this.MazeGrid[0].length;
        this.GridHeight = this.MazeGrid[0][0].length;
        this.EndLocation = endLocation;
        this.CharacterIcon = String.fromCharCode(0xD83D, 0xDE00); // 😀"
        this.EndIcon = String.fromCharCode(0xD83C, 0xDFC1); // "🏁"; 
        this.move("");
    }
    Character.prototype.move = function (direction) {
        $(".y" + this.CurrentLocation.Y + "x" + this.CurrentLocation.X).text("");
        $(".y" + this.CurrentLocation.Y + "x" + this.CurrentLocation.X).removeClass(this.Name);
        switch (direction) {
            case this.North:
                if (this.CurrentLocation.North && this.CurrentLocation.Y > 0)
                    this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y - 1][this.CurrentLocation.X];
                break;
            case this.East:
                if (this.CurrentLocation.East && this.CurrentLocation.X < this.GridWidth - 1)
                    this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X + 1];
                break;
            case this.South:
                if (this.CurrentLocation.South && this.CurrentLocation.Y < this.GridHeight - 1)
                    this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y + 1][this.CurrentLocation.X];
                break;
            case this.West:
                if (this.CurrentLocation.West && this.CurrentLocation.X > 0)
                    this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X - 1];
                break;
            case this.Up:
                if (this.CurrentLocation.Z === this.GridLayers - 1)
                    this.CurrentLocation = this.MazeGrid[0][this.CurrentLocation.Y][this.CurrentLocation.X];
                else
                    this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z + 1][this.CurrentLocation.Y][this.CurrentLocation.X];
                break;
            case this.Down:
                if (this.CurrentLocation.Z === 0)
                    this.CurrentLocation = this.MazeGrid[this.GridLayers - 1][this.CurrentLocation.Y][this.CurrentLocation.X];
                else
                    this.CurrentLocation = this.MazeGrid[this.CurrentLocation.Z - 1][this.CurrentLocation.Y][this.CurrentLocation.X];
                break;
            default:
                // console.log(`Invalid attempt to move from ${this.CurrentLocation} ${direction}`);
                break;
        }
        // if (this.EndLocation !== undefined && typeof this.EndLocation !== undefined &&  this.EndLocation !== null) {
        if (this.MazeGrid[this.CurrentLocation.Z][this.CurrentLocation.Y][this.CurrentLocation.X] === this.MazeGrid[this.EndLocation.Z][this.EndLocation.Y][this.EndLocation.X]) {
            this.CharacterIcon = String.fromCharCode(0xD83D, 0xDE0E); // "😎";
            this.EndIcon = String.fromCharCode(0xD83C, 0xDF89); //"🎉";
            $(".y" + this.CurrentLocation.Y + "x" + this.CurrentLocation.X).addClass("game-won");
            $("#play-again").show();
            // $(`.desc`).hide();
            // $(`.gameButtons`).hide();
            // $(`.mazeHeader`).hide();
        }
        $(".winter.y" + this.EndLocation.Y + "x" + this.EndLocation.X).text(this.EndIcon);
        $(".y" + this.CurrentLocation.Y + "x" + this.CurrentLocation.X).text(this.CharacterIcon);
        $(".y" + this.CurrentLocation.Y + "x" + this.CurrentLocation.X).addClass(this.Name);
        // }
    };
    return Character;
}());
var Maze = /** @class */ (function () {
    function Maze(gridLayers, gridWidth, gridHeight, mazePathCompressed) {
        this.gridLayers = gridLayers;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.mazePathCompressed = mazePathCompressed;
        // public Maze: any;
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
        this.Back = "B";
        this.GridLayers = gridLayers;
        this.GridWidth = gridWidth;
        this.GridHeight = gridHeight;
        // generate the grid
        this.MazeGrid = this.generateGrid();
        // create the cells list
        this.CellsList = [new Cell(0, 0, 0)];
        if (mazePathCompressed !== undefined && typeof mazePathCompressed !== undefined && mazePathCompressed !== "") {
            // it's procedural
            this.fillMazeProcedural();
            this.MazePathCompressed = mazePathCompressed;
            var uncompressed = LZString.decompressFromEncodedURIComponent(mazePathCompressed);
            if (uncompressed !== undefined && uncompressed !== null) {
                this.MazePath = uncompressed;
            }
            else {
                this.MazePath = "";
            }
        }
        else {
            // It's random
            this.MazePath = "";
            this.fillMazeRandom();
            this.EndLocation =
                { Z: 0,
                    Y: this.getRandomIntInclusive(1, this.gridHeight - 1),
                    X: this.getRandomIntInclusive(1, this.gridWidth - 1) };
            this.MazePath += "|" + JSON.stringify(this.EndLocation);
            this.MazePathCompressed = LZString.compressToEncodedURIComponent(this.MazePath);
        }
    }
    Maze.prototype.getEndLocation = function (str) {
        console.log(JSON.parse(str.split('|')[1]));
    };
    Maze.prototype.fillMazeProcedural = function () {
        // let pro : string = "";
        // OoVQoiDKkskCIDllWMZ6zzNEiR7ZI4H4SxpyXHzDzZZhZ1qSiTngTR3S1x4w+dNjzgkibACEpoGYhlT+kjkJwkmCaFnxQ8kpBLT1mUkjGS6oUhYrizJwKZEWu373ALjM4Jy7MNWeARvCEkIIWMbND0lbXBYMwUmWgYDGCd3LOybBXg3Lhyi10QwYvLFFwrqmtqaqrrGpuKAbSF4AC4AbwAiAC0ejoAGABoegE1BgHYxgA1BgFYAXwBdIA
        var decompressed = LZString.decompressFromEncodedURIComponent(this.MazePathCompressed);
        if (decompressed !== undefined && typeof decompressed !== undefined && decompressed !== null) {
            this.MazePath = decompressed;
        }
        this.getEndLocation(this.MazePath);
        // let templateList = 
        // let index: number = -1;
        // while (this.CellsList.length > 0) {
        // 	// index is the newest
        // 	index = this.CellsList.length - 1;
        // 	const currentCell: Cell = this.CellsList[index];
        // 	const directions: string[] = this.getRandomDirections ();
        // 	for (let i = 0; i < directions.length; i++) {
        // 		const nextCell: Cell = this.directionModifier (this.CellsList[index], directions[i]);
        // 		if (this.isEmptyCell(nextCell.Z, nextCell.Y, nextCell.X)) {
        // 			// we found a workable direction
        // 			const result: any = this.carvePathBetweenCells (currentCell, nextCell, directions[i]);
        // 			this.MazeGrid[currentCell.Z][currentCell.Y][currentCell.X] = result.current;
        // 			this.MazeGrid[nextCell.Z][nextCell.Y][nextCell.X] = result.next;
        // 			this.CellsList.push(nextCell);
        // 			this.encodeMaze(directions[i]);
        // 			index = -1;
        // 			break;
        // 		}
        // 	}
        // 	if (index !== -1) {
        // 		this.CellsList.splice(index, 1);
        // 		this.encodeMaze(this.Back);
        // 	}
        // }
    };
    Maze.prototype.encodeMaze = function (direction) {
        this.MazePath += direction;
        // console.log(this.groupBy(this.MazeGrid[0][1], this.North));
        // console.log(this.MazeGrid.reduce(function(allCells, currentCell){
        // 	if(typeof currentCell === 'object' && currentCell instanceof Cell)
        // 		console.log("IS CELL");
        // 	else
        // 		console.log("no");
        // 	return allCells;
        // }))
        //JSON.stringify(this.MazeGrid); //, this.simplifyMazeGrid);
        // console.log(JSON.stringify(this.MazeGrid, this.simplifyMazeGrid));
        // console.log((JSON.stringify(this.MazeGrid)));
    };
    // groupBy(objectArray: any, property: any) {
    // 	return objectArray.reduce(function (acc: any, obj: any) {
    // 		var key = obj[property];
    // 		if (!acc[key]) {
    // 			acc[key] = [];
    // 		}
    // 		// if (!acc[key] || acc[key] == false) {
    // 		// 	acc[key] = [];
    // 		// } else {
    // 		// 	acc[key].push(obj);
    // 		// }
    // 		acc[key].push(obj);
    // 		return acc;
    // 	}, {});
    // }
    // protected simplifyMazeGrid (key: any, value: any) {
    // 	// Filtering out properties
    // 	if (typeof value === 'string') {
    // 		return undefined;
    // 	} else if(value !== undefined && typeof value === 'object' && value instanceof Cell) {
    // 		let newCell: string[]; 
    // 		console.log(this.Directions);
    // 		// this.Directions.forEach(function(direction) {
    // 			// console.log(value[direction]);
    // 		// });
    // 	}
    // 	return value;
    // 	// for (let z: number = 0; z < this.MazeGrid.length; z++) {
    // 	// 	for (let y: number = 0; y < this.MazeGrid[0].length; y++) {
    // 	// 		for (let x: number = 0; x < this.MazeGrid[0][0].length; x++) {
    // 	// 			const currentCell = this.MazeGrid[z][y][x];
    // 	// 		}
    // 	// 	}
    // 	// }
    // }
    Maze.prototype.fillMazeRandom = function () {
        // Add the first cell to the list
        // this.CellsList.push(new Cell(
        // 	0,
        // 	this.getRandomIntInclusive (0, this.gridHeight - 1),
        // 	this.getRandomIntInclusive (0, this.gridWidth - 1),
        // ));
        var index = -1;
        while (this.CellsList.length > 0) {
            // index is the newest
            index = this.CellsList.length - 1;
            var currentCell = this.CellsList[index];
            var directions = this.getRandomDirections();
            for (var i = 0; i < directions.length; i++) {
                var nextCell = this.directionModifier(this.CellsList[index], directions[i]);
                if (this.isEmptyCell(nextCell.Z, nextCell.Y, nextCell.X)) {
                    // we found a workable direction
                    var result = this.carvePathBetweenCells(currentCell, nextCell, directions[i]);
                    this.MazeGrid[currentCell.Z][currentCell.Y][currentCell.X] = result.current;
                    this.MazeGrid[nextCell.Z][nextCell.Y][nextCell.X] = result.next;
                    this.CellsList.push(nextCell);
                    this.encodeMaze(directions[i]);
                    index = -1;
                    break;
                }
            }
            if (index !== -1) {
                this.CellsList.splice(index, 1);
                this.encodeMaze(this.Back);
            }
        }
    };
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
    Maze.prototype.carvePathBetweenCells = function (currentCell, nextCell, direction) {
        switch (direction) {
            case this.North:
                currentCell.North = true;
                nextCell.South = true;
                break;
            case this.East:
                currentCell.East = true;
                nextCell.West = true;
                break;
            case this.South:
                currentCell.South = true;
                nextCell.North = true;
                break;
            case this.West:
                currentCell.West = true;
                nextCell.East = true;
                break;
            case this.Up:
                currentCell.Up = true;
                nextCell.Down = true;
                break;
            case this.Down:
                currentCell.Down = true;
                nextCell.Up = true;
                break;
        }
        return { current: currentCell, next: nextCell };
    };
    Maze.prototype.getRandomIntInclusive = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
        // The maximum is inclusive and the minimum is inclusive
    };
    Maze.prototype.getRandomDirections = function () {
        return this.shuffle(this.Directions);
    };
    /**
     * Shuffles array in place.
     * @param {Array} array items An array containing the items.
     */
    Maze.prototype.shuffle = function (array) {
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
            case this.North:
                return new Cell(cell.Z, cell.Y - 1, cell.X);
            case this.East:
                return new Cell(cell.Z, cell.Y, cell.X + 1);
            case this.South:
                return new Cell(cell.Z, cell.Y + 1, cell.X);
            case this.West:
                return new Cell(cell.Z, cell.Y, cell.X - 1);
            case this.Up:
                // if we're at the top layer, loop around
                if (cell.Z === this.gridLayers - 1)
                    return new Cell(0, cell.Y, cell.X);
                else
                    return new Cell(cell.Z + 1, cell.Y, cell.X);
            case this.Down:
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
        $("#play-again").hide();
        // $(`.desc`).show();
        // $(`.gameButtons`).show();
        // $(`.gameButtons`).show();
        // $(`.MazeHeader`).show();
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
        $("#maze-game").html(html);
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
function main() {
    currentLayer = 0;
    GridLayers = 4;
    GridHeight = 8;
    GridWidth = 8;
    var myMaze = new Maze(GridLayers, GridHeight, GridWidth);
    var mazeViewer = new MazeView(myMaze.MazeGrid, myMaze.EndLocation);
    mazeViewer.displayMaze();
    console.log(myMaze.MazePath);
    console.log(myMaze.MazePathCompressed);
    // console.table(myMaze.MazeGrid[0][0]);
    showLayerHideOthers(currentLayer);
    MyCharacter = new Character("happyemoji", "happy", myMaze.MazeGrid[0][0][0], myMaze.MazeGrid, myMaze.EndLocation);
}
// https://stackoverflow.com/questions/1402698/binding-arrow-keys-in-js-jquery
document.addEventListener('keydown', function (e) {
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
        case 72:
            showHelp();
            break;
        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
function showHelp() {
}
function showLayerHideOthers(layerChoice) {
    if (GridLayers > 1) {
        for (var layer = 0; layer < GridLayers; layer++) {
            var layerId = "#layer" + layer;
            if (layer === layerChoice)
                $(layerId).show();
            else
                $(layerId).hide();
        }
    }
}
function goNorth() {
    MyCharacter.move(MyCharacter.North);
}
function goEast() {
    MyCharacter.move(MyCharacter.East);
}
function goSouth() {
    MyCharacter.move(MyCharacter.South);
}
function goWest() {
    MyCharacter.move(MyCharacter.West);
}
function goUp() {
    if (currentLayer < GridLayers - 1)
        currentLayer++;
    else
        currentLayer = 0;
    showLayerHideOthers(currentLayer);
    MyCharacter.move(MyCharacter.Up);
}
function goDown() {
    if (currentLayer === 0)
        currentLayer = GridLayers - 1;
    else
        currentLayer--;
    showLayerHideOthers(currentLayer);
    MyCharacter.move(MyCharacter.Down);
}
