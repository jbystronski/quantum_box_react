import { Tree as T } from "src/types";

export class Node implements T.NodeInterface {
  private _id: T.Node.Id = null;
  private _children: T.Node.Children = [];
  private _parentAddr: T.Node.Addr = [];
  private _open: T.Node.Open = false;
  private _value: T.Node.Value = null;
  private _addr: T.Node.Addr = [];

  constructor(id: T.Node.Id, parentAddr: T.Node.Addr, value: T.Node.Value) {
    this._id = id;
    this._parentAddr = parentAddr;
    this._addr = [...parentAddr, id];
    this._open = false;
    this._value = value;
  }

  get isLeaf() {
    return this._children.length === 0;
  }

  get id() {
    return this._id;
  }

  get addr() {
    return this._addr;
  }

  get parentAddr() {
    return this._parentAddr;
  }

  get parentId() {
    return this._parentAddr.reverse()[0];
  }

  set children(v: T.Node.Children) {
    this._children = v;
  }

  get children() {
    return this._children;
  }

  get value() {
    return this._value;
  }

  set value(v) {
    this._value = v;
  }

  get open() {
    return this._open;
  }

  set open(v: T.Node.Open) {
    this._open = v;
  }

  get nestingLevel() {
    return this._parentAddr?.length - 1;
  }
}
