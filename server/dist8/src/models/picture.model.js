"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
let Picture = class Picture extends repository_1.Entity {
    getId() {
        return this.id;
    }
};
__decorate([
    repository_1.property({
        id: true,
    }),
    __metadata("design:type", Number)
], Picture.prototype, "id", void 0);
__decorate([
    repository_1.property({
        required: true,
    }),
    __metadata("design:type", String)
], Picture.prototype, "url", void 0);
__decorate([
    repository_1.property({
        required: true,
    }),
    __metadata("design:type", Number)
], Picture.prototype, "width", void 0);
__decorate([
    repository_1.property({
        required: true,
    }),
    __metadata("design:type", Number)
], Picture.prototype, "height", void 0);
__decorate([
    repository_1.property({
        required: true,
    }),
    __metadata("design:type", Boolean)
], Picture.prototype, "silhouette", void 0);
Picture = __decorate([
    repository_1.model()
], Picture);
exports.Picture = Picture;
//# sourceMappingURL=picture.model.js.map