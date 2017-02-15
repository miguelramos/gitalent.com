import { Injectable } from '@angular/core';

import { Enum } from '../../../foundation/system/enumify';
import { BaseModel } from '../../../foundation/models/base.model';
import { Collection } from '../../../foundation/models/collection';
import { Attribute, Entity } from '../../../foundation/models/meta.model';

export class PositionType extends Enum {
  static LEFT: PositionType;
  static RIGHT: PositionType;
}

PositionType.initEnum(
  ['LEFT', 'RIGHT']
);

@Injectable()
@Entity()
export class BrandModel extends BaseModel {
  @Attribute()
  private active: boolean;
  @Attribute()
  private image: string | URL;
  @Attribute()
  private label: string;
  @Attribute()
  private link: string | URL;

  constructor(data: Object) {
    super(data);
  }

  public setActive(active: boolean): void {
    this.active = active;
    this.setChanges({ active: active });
  }

  public getActive(): boolean {
    return this.active;
  }

  public setImage(image: string | URL): void {
    this.image = image;
    this.setChanges({ image: image });
  }

  public getImage(): string | URL {
    return this.image;
  }

  public setLabel(label: string): void {
    this.label = label;
    this.setChanges({ label: label });
  }

  public getLabel(): string {
    return this.label;
  }

  public setLink(link: string | URL): void {
    this.link = link;
    this.setChanges({ link: link });
  }

  public getLink(): string | URL {
    return this.link;
  }
}

@Injectable()
@Entity()
export class MenuModel extends BaseModel {
  @Attribute()
  private link: string | URL;
  @Attribute()
  private label: string;
  @Attribute()
  private classes: string[];
  @Attribute({
    relation: null,
    converter: PositionType.converter()
  })
  private position: PositionType;
  @Attribute()
  private active: boolean;
  @Attribute()
  private enable: boolean;
  @Attribute()
  private icon: string;

  constructor(data: Object) {
    super(data);
  }

  public setLink(link: string | URL): void {
    this.link = link;
    this.setChanges({ link: link });
  }

  public getLink(): string | URL {
    return this.link;
  }

  public setLabel(label: string): void {
    this.label = label;
    this.setChanges({ label: label });
  }

  public setClasses(classes: string[]): void {
    this.classes = classes;
    this.setChanges({ classes: classes });
  }

  public getClasses(): string[] {
    return this.classes;
  }

  public getPosition(): PositionType {
    return this.position;
  }

  public setActive(active: boolean): void {
    this.active = active;
    this.setChanges({ active: active });
  }

  public getActive(): boolean {
    return this.active;
  }

  public setEnable(enable: boolean): void {
    this.enable = enable;
    this.setChanges({ enable: enable });
  }

  public getEnable(): boolean {
    return this.enable;
  }

  public setIcon(icon: string): void {
    this.icon = icon;
    this.setChanges({ icon: icon });
  }

  public getIcon(): string {
    return this.icon;
  }
}

@Injectable()
@Entity()
export class NavModel extends BaseModel {
  @Attribute({
    relation: (resource => new BrandModel(resource))
  })
  private brand: BrandModel;
  @Attribute({
    relation: (resource => new MenuModel(resource))
  })
  private menu: Collection<MenuModel>;

  constructor(data: Object) {
    super(data);
  }

  public setBrand(model: BrandModel): void {
    this.brand = model;
    this.setChanges({ brand: model });
  }

  public getBrand(): BrandModel {
    return this.brand;
  }

  public setMenu(model: MenuModel): void {
    this.menu.add(model);
    this.setChanges({ menu: model });
  }

  public getMenu(): Collection<MenuModel> {
    return this.menu;
  }
}
